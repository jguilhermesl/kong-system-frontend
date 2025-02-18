/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { Purchase } from "@/models/Purchase";
import api from "@/services/api";
export interface getClientPurchasesResponse extends ApiResponse {
  data: Purchase[];
}

export const getClientPurchases = async (id: string): Promise<getClientPurchasesResponse> => {
  try {
    const response = await api.get(`/client/${id}/purchases`);
    return response.data as getClientPurchasesResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};
