import type {
  AnalyticsData,
  PendingActionsData,
  CustomerInsightsData,
} from '@/lib/types/seller-types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getSellerAnalytics(email: string): Promise<AnalyticsData | null> {
  await delay(300);
  try {
    const response = await fetch(`/api/seller/analytics?email=${encodeURIComponent(email)}`);
    const result = await response.json();

    if (!result.success) {
      console.error('Error fetching analytics:', result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }
}

export async function getPendingActions(email: string): Promise<PendingActionsData | null> {
  await delay(200);
  try {
    const response = await fetch(`/api/pending-actions?email=${encodeURIComponent(email)}`);
    const result = await response.json();

    if (!result.success) {
      console.error('Error fetching pending actions:', result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching pending actions:', error);
    return null;
  }
}

export async function getCustomerInsights(email: string): Promise<CustomerInsightsData | null> {
  await delay(250);
  try {
    const response = await fetch(
      `/api/seller/customer-insights?email=${encodeURIComponent(email)}`
    );
    const result = await response.json();

    if (!result.success) {
      console.error('Error fetching customer insights:', result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching customer insights:', error);
    return null;
  }
}
