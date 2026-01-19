import { NextResponse } from 'next/server';
import type { VerificationRequest, VerificationStatus } from '@/lib/types/verification';

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
