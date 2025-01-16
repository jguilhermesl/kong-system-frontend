/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { User } from "@/models/User";
import api from "@/services/api";

export interface FetchClientsResponse extends ApiResponse {
  data: User[]
}

export const fetchClients = async () => {
  try {
    const response = await api.get("/client");
    return response.data as FetchClientsResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};