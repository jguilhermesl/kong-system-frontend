/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { Indication } from "@/models/Indication";
import api from "@/services/api";

export interface FetchIndicationsResponse extends ApiResponse {
  data: Indication[]
}

export const fetchIndications = async () => {
  try {
    const response = await api.get("/indications");
    return response.data as FetchIndicationsResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};