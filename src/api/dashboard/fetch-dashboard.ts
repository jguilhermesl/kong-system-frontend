/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import api from "@/services/api";

export interface FetchDashboardResponse extends ApiResponse {
  data: any
}

export const fetchDashboard = async () => {
  try {
    const response = await api.get("/dashboard");
    return response.data as FetchDashboardResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};