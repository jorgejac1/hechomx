/**
 * @fileoverview Mock user data for authentication.
 * Re-exports full seller profiles from mockUsers for dashboard functionality.
 * @module lib/data/mockUsersAuth
 */

import { mockIndividualSeller, mockArtisan, mockCompany, MOCK_SELLER_USERS } from './mockUsers';

// Re-export full mock users for auth (with products, stats, reviews, etc.)
export const mockIndividualSellerAuth = mockIndividualSeller;
export const mockArtisanAuth = mockArtisan;
export const mockCompanyAuth = mockCompany;

// Export mock users for auth
export const MOCK_SELLER_USERS_AUTH = MOCK_SELLER_USERS;
