/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { Financial } from "@/models/Financial";
import api from "@/services/api";

export interface FetchFinancialResponse extends ApiResponse {
  data: Financial[],
  metrics: {
    pendingPaymentValue: number,
    totalProfit: number,
    totalRevenue: number,
    weeklySalesCount: number,
    weeklySalesRevenue: number,
    monthlyMetrics: {
      month: number,
      monthlyProfit: number,
      monthlyRevenue: number,
      salesCount: number,
      year: number
    }[]
  }
}

export const fetchFinancial = async () => {
  try {
    const response = await api.get("/financial");
    return response.data as FetchFinancialResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};