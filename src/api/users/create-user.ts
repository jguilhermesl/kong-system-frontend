import api from "@/services/api";


export interface CreateUserProps {
  name: string,
  phone: string,
  cpf: string
  email: string
  password: string,
  role: "admin" | "client"
}

export async function createUser(body: CreateUserProps) {
  const response = await api.post(`/user`, body);
  return response.data;
}
