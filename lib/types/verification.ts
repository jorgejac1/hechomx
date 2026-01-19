export type VerificationLevel =
  | 'basic_seller'
  | 'verified_artisan'
  | 'master_artisan'
  | 'certified_workshop';

export type VerificationStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'info_requested'
  | 'approved'
  | 'rejected'
  | 'expired';

export type SellerType = 'individual' | 'hobby' | 'company';

export interface FileUpload {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: Date;
  status: 'uploading' | 'completed' | 'error';
}

export interface VerificationRequest {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  sellerType: SellerType;
  requestedLevel: VerificationLevel;
  status: VerificationStatus;

  documents: {
    governmentId?: FileUpload;
    proofOfAddress?: FileUpload;
    curp?: FileUpload;
    rfc?: FileUpload;
    businessRegistration?: FileUpload;
    operatingLicense?: FileUpload;
    craftPhotos: FileUpload[];
    craftVideos: FileUpload[];
    workshopPhotos: FileUpload[];
    processVideo?: FileUpload;
    certifications: FileUpload[];
    references: FileUpload[];
    awards: FileUpload[];
  };

  questionnaire: {
    craftType: string[];
    techniques: string[];
    yearsOfExperience: number;
    productionCapacity: 'small' | 'medium' | 'large';
    location: {
      state: string;
      city: string;
      address?: string;
      hasPhysicalWorkshop: boolean;
    };
    heritageInfo?: string;
    culturalSignificance?: string;
    indigenousCommunity?: string;
    traditionalTechniques?: boolean;
    culturalOrganization?: string;
    referenceContact?: string;
    communityVouching?: string[];
  };

  reviewedBy?: string;
  reviewedByName?: string;
  reviewedAt?: Date;
  reviewNotes?: string;
  approvedLevel?: VerificationLevel;
  rejectionReason?: string;
  requestedInfo?: string;

  createdAt: Date;
  submittedAt?: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

export interface Badge {
  id: string;
  name: string;
  nameEs: string;
  type: 'verification' | 'achievement' | 'certification';
  level?: VerificationLevel;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  descriptionEs: string;
  criteria?: string;
  earnedAt: Date;
  expiresAt?: Date;
  verified: boolean;
}

export interface SellerVerification {
  status: 'unverified' | 'pending' | 'verified' | 'rejected';
  level: VerificationLevel | null;
  badges: Badge[];
  verifiedAt?: Date;
  expiresAt?: Date;
  lastVerificationRequestId?: string;
  commissionRate: number;
  features: {
    canSell: boolean;
    canCreateListings: boolean;
    maxListings: number;
    canAccessPremiumFeatures: boolean;
    canAccessAnalytics: boolean;
    canUseCustomURL: boolean;
    featuredPlacement: boolean;
    prioritySupport: boolean;
  };
  trustScore: number;
  completedVerifications: string[];
}

export interface VerificationLevelInfo {
  level: VerificationLevel;
  name: string;
  nameEs: string;
  badge: Badge;
  requirements: string[];
  requirementsEs: string[];
  benefits: string[];
  benefitsEs: string[];
  commissionRate: number;
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface VerificationQueueItem {
  id: string;
  request: VerificationRequest;
  priority: 'urgent' | 'high' | 'normal' | 'low';
  daysWaiting: number;
  flagged: boolean;
  flagReason?: string;
  assignedTo?: string;
}

export interface VerificationFormData {
  sellerType: SellerType;
  requestedLevel: VerificationLevel;
  documents: Partial<VerificationRequest['documents']>;
  questionnaire: Partial<VerificationRequest['questionnaire']>;
}

export interface VerificationStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
}
