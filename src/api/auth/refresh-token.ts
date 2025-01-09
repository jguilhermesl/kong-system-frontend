/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/services/api";

export interface Response {
  accessToken: string;
  refreshToken: string;
  role: "admin" | "client"
}

export const refreshToken = async (accessToken: string, refreshToken: string) => {
  try {
    const response = await api.post("/refresh-token", { accessToken, refreshToken });
    return response.data as Response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.message);
  }
};