/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { User } from "@/models/User";
import api from "@/services/api";

export interface MeProfileResponse extends ApiResponse {
  data: User
}

export const meProfile = async () => {
  try {
    const response = await api.get("/me");
    return response.data as MeProfileResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};