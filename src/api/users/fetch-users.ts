/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { User } from "@/models/User";
import api from "@/services/api";

export interface FetchUsersResponse extends ApiResponse {
  data: User[]
}

export const fetchUsers = async () => {
  try {
    const response = await api.get("/user");
    return response.data as FetchUsersResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};