import type { AnalyticsData, PendingActionsData, CustomerInsightsData } from '@/lib/types/seller';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getSellerAnalytics(email: string): Promise<AnalyticsData | null> {
  await delay(300);
  try {
    const response = await fetch('/data/seller-analytics.json');
    const data = await response.json();
    return data[email] || null;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }
}

export async function getPendingActions(email: string): Promise<PendingActionsData | null> {
  await delay(200);
  try {
    const response = await fetch('/data/pending-actions.json');
    const data = await response.json();
    return data[email] || null;
  } catch (error) {
    console.error('Error fetching pending actions:', error);
    return null;
  }
}

export async function getCustomerInsights(email: string): Promise<CustomerInsightsData | null> {
  await delay(250);
  try {
    const response = await fetch('/data/customer-insights.json');
    const data = await response.json();
    return data[email] || null;
  } catch (error) {
    console.error('Error fetching customer insights:', error);
    return null;
  }
}
