/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { InventoryItem } from "@/models/Inventory";
import api from "@/services/api";
export interface getInventoryDetailResponse extends ApiResponse {
  data: InventoryItem;

}

export const getInventoryDetail = async (id: string): Promise<getInventoryDetailResponse> => {
  try {
    const response = await api.get(`/inventory/${id}`);
    return response.data as getInventoryDetailResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};
