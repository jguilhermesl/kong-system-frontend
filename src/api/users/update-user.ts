import api from "@/services/api";


export interface UpdateUserProps {
  name: string,
  phone: string,
  cpf: string
  email: string
  role: "admin" | "client"
}

export async function updateUser(body: UpdateUserProps, id: string) {
  const response = await api.put(`/user/${id}`, body);
  return response.data;
}