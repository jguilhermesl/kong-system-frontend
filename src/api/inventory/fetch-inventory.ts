/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { InventoryItem } from "@/models/Inventory";
import api from "@/services/api";

export interface FetchInventoryResponse extends ApiResponse {
  data: InventoryItem[]
}

interface FetchInventoryProps {
  search?: string,
  sold?: "true" | "false"
}

export const fetchInventory = async ({ search, sold }: FetchInventoryProps) => {
  try {
    const response = await api.get("/inventory", {
      params: {
        search,
        sold
      }
    });
    return response.data as FetchInventoryResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};