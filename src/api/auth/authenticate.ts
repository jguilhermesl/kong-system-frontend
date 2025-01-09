/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/services/api";

export interface AuthenticateResponse {
  data: {
    token: string;
    refreshToken: string;
    role: "admin" | "client"
  }
}

export interface AuthenticateProps {
  email: string,
  password: string,
}

export const authenticate = async (data: AuthenticateProps) => {
  try {
    const response = await api.post("/auth", {
      email: data.email,
      password: data.password,
      role: "client"
    });
    return response.data as AuthenticateResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};