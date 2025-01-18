import api from "@/services/api";

export interface CreateUserProps {
  name: string,
  phone: string,
  cpf: string
  email: string
  password?: string,
  role?: "admin" | "client",
  console?: 'PS4' | 'PS5' | ''
}

export async function createUser(body: CreateUserProps) {
  const response = await api.post(`/user`, body);
  return response.data;
}
