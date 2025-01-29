/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import api from "@/services/api";

export interface Purchase {
  id: string;
  createdAt: string | null;
  inventory: Inventory;
}

export interface Inventory {
  accountType: string;
  accountValue: string;
  email: string;
  game: string;
  gameVersion: string;
  password: string;
}

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
