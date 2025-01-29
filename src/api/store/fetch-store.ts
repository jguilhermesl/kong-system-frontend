/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { Store } from "@/models/Store";
import api from "@/services/api";

export interface FetchStoreResponse extends ApiResponse {
  data: {
    category: string,
    items: Store[]
  }[]
}

export const fetchStore = async () => {
  try {
    const response = await api.get("/store");
    return response.data as FetchStoreResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};