/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { User } from "@/models/User";
import api from "@/services/api";

export interface FetchSellersResponse extends ApiResponse {
  data: User[]
}

export const fetchSellers = async () => {
  try {
    const response = await api.get("/sellers");
    return response.data as FetchSellersResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};