/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { Financial } from "@/models/Financial";
import api from "@/services/api";

export interface FetchFinancialResponse extends ApiResponse {
  data: Financial[]
}

export const fetchFinancial = async () => {
  try {
    const response = await api.get("/financial");
    return response.data as FetchFinancialResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};