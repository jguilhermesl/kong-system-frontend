/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { InventoryItem } from "@/models/Inventory";
import api from "@/services/api";

export interface GetInventoryDetailResponse extends ApiResponse {
  data: InventoryItem;
}

export const getInventoryDetail = async (id: string): Promise<GetInventoryDetailResponse> => {
  try {
    const response = await api.get(`/inventory/${id}`);
    return response.data as GetInventoryDetailResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};
