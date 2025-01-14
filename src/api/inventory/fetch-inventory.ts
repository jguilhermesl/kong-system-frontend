/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { InventoryItem } from "@/models/Inventory";
import api from "@/services/api";

export interface FetchInventoryResponse extends ApiResponse {
  data: InventoryItem[]
}

export const fetchInventory = async () => {
  try {
    const response = await api.get("/inventory");
    return response.data as FetchInventoryResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};