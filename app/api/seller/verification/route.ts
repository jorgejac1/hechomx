/**
 * @fileoverview Seller Verification API endpoint
 * Handles seller verification requests including retrieving, submitting, and updating verification status.
 * Supports GET (retrieve by email), POST (submit new request), and PATCH (update existing request) methods.
 * @module app/api/seller/verification/route
 */

import { NextResponse } from 'next/server';
import type { VerificationRequest, VerificationStatus } from '@/lib/types/verification';

/**
 * @interface VerificationResponse
 * @property {VerificationRequest|null} request - The verification request object or null if not found
 * @property {string} [error] - Error message if request fails
 */

/**
 * @interface VerificationSubmitResponse
 * @property {boolean} success - Indicates if the submission was successful
 * @property {VerificationRequest} request - The newly created verification request
 */

/**
 * @interface VerificationUpdateResponse
 * @property {boolean} success - Indicates if the update was successful
 * @property {string} message - Status message
 * @property {VerificationRequest} request - The updated verification request
 */

const mockRequests: Record<string, VerificationRequest> = {
  'jorge@example.com': {
    id: 'ver_001',
    sellerId: 'seller_001',
    sellerName: 'Jorge Artesano',
    sellerEmail: 'jorge@example.com',
    sellerType: 'individual',
    requestedLevel: 'verified_artisan',
    status: 'submitted',
    documents: {
      craftPhotos: [],
      craftVideos: [],
      workshopPhotos: [],
      certifications: [],
      references: [],
      awards: [],
    },
    questionnaire: {
      craftType: ['ceramica', 'talavera'],
      techniques: ['torno', 'pintado_mano'],
      yearsOfExperience: 15,
      productionCapacity: 'medium',
      location: {
        state: 'Puebla',
        city: 'Puebla',
        hasPhysicalWorkshop: true,
      },
      heritageInfo: 'Técnicas tradicionales heredadas de mi abuelo',
      culturalSignificance: 'Trabajo con técnicas de Talavera tradicional de Puebla',
      traditionalTechniques: true,
    },
    createdAt: new Date('2025-11-10T09:00:00Z'),
    submittedAt: new Date('2025-11-10T10:15:00Z'),
    updatedAt: new Date('2025-11-10T10:15:00Z'),
  },
};

/**
 * Retrieves a verification request by seller email
 * @param {Request} request - The incoming HTTP request object
 * @param {string} request.url - URL containing email query parameter
 * @returns {Promise<NextResponse>} JSON response containing the verification request
 * @returns {VerificationRequest|null} response.request - The verification request or null if not found
 * @returns {string} [response.error] - Error message if email parameter is missing
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  const verificationRequest = mockRequests[email];

  if (!verificationRequest) {
    return NextResponse.json({ request: null });
  }

  return NextResponse.json({ request: verificationRequest });
}

/**
 * Submits a new verification request for a seller
 * @param {Request} request - The incoming HTTP request object
 * @param {object} request.body - JSON body containing seller verification data
 * @param {string} request.body.sellerId - Unique identifier for the seller
 * @param {string} request.body.sellerName - Name of the seller
 * @param {string} request.body.sellerEmail - Email address of the seller
 * @param {string} request.body.sellerType - Type of seller (e.g., 'individual')
 * @param {string} request.body.requestedLevel - Requested verification level
 * @param {object} [request.body.questionnaire] - Optional questionnaire data
 * @returns {Promise<NextResponse>} JSON response containing the created verification request
 * @returns {boolean} response.success - Success status of the submission
 * @returns {VerificationRequest} response.request - The newly created verification request
 */
export async function POST(request: Request) {
  const data = await request.json();

  const newRequest: VerificationRequest = {
    id: `ver_${Date.now()}`,
    sellerId: data.sellerId,
    sellerName: data.sellerName,
    sellerEmail: data.sellerEmail,
    sellerType: data.sellerType,
    requestedLevel: data.requestedLevel,
    status: 'submitted',
    documents: {
      craftPhotos: [],
      craftVideos: [],
      workshopPhotos: [],
      certifications: [],
      references: [],
      awards: [],
    },
    questionnaire: data.questionnaire || {
      craftType: [],
      techniques: [],
      yearsOfExperience: 0,
      productionCapacity: 'small',
      location: {
        state: '',
        city: '',
        hasPhysicalWorkshop: false,
      },
    },
    createdAt: new Date(),
    submittedAt: new Date(),
    updatedAt: new Date(),
  };

  // Store in mock data
  mockRequests[data.sellerEmail] = newRequest;

  return NextResponse.json({ success: true, request: newRequest });
}

/**
 * Updates an existing verification request
 * @param {Request} request - The incoming HTTP request object
 * @param {object} request.body - JSON body containing update data
 * @param {string} request.body.id - ID of the verification request to update
 * @param {VerificationStatus} request.body.status - New status for the verification request
 * @param {object} [request.body.updates] - Additional fields to update
 * @returns {Promise<NextResponse>} JSON response containing the updated verification request
 * @returns {boolean} response.success - Success status of the update
 * @returns {string} response.message - Status message
 * @returns {VerificationRequest} response.request - The updated verification request
 * @returns {string} [response.error] - Error message if request not found
 */
export async function PATCH(request: Request) {
  const data = await request.json();
  const { id, status, ...updates } = data;

  // Find the request by ID across all emails
  let foundEmail: string | null = null;
  let foundRequest: VerificationRequest | null = null;

  for (const [email, req] of Object.entries(mockRequests)) {
    if (req.id === id) {
      foundEmail = email;
      foundRequest = req;
      break;
    }
  }

  if (!foundRequest || !foundEmail) {
    return NextResponse.json({ error: 'Verification request not found' }, { status: 404 });
  }

  // Update the request
  const updatedRequest: VerificationRequest = {
    ...foundRequest,
    ...updates,
    status: status as VerificationStatus,
    updatedAt: new Date(),
  };

  // Store the updated request
  mockRequests[foundEmail] = updatedRequest;

  return NextResponse.json({
    success: true,
    message: 'Verification request updated',
    request: updatedRequest,
  });
}
