/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { User } from "@/models/User";
import api from "@/services/api";

export interface FetchClientsResponse extends ApiResponse {
  data: User[]
}

export interface FetchClientsProps {
  search?: string
}

export const fetchClients = async (data?: FetchClientsProps) => {
  try {
    const response = await api.get("/client", {
      params: {
        ...data
      }
    });
    return response.data as FetchClientsResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};