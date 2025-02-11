/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/services/api";

export interface CreateUserProps {
  name: string,
  phone: string,
  cpf: string
  email: string
  password?: string,
  role?: "admin" | "client",
  console?: 'PS4' | 'PS5' | '',
  isAdminAction?: boolean
}

export async function createUser(body: CreateUserProps) {
  try {
    const response = await api.post(`/user`, body);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
}
