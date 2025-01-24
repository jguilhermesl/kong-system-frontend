import api from "@/services/api";


export interface UpdateClientProps {
  name: string,
  cpf: string,
  email: string,
  phone: string,
  role: "admin" | "client",
  console: "PS4" | "PS5"
}

export async function updateClient(body: UpdateClientProps, id: string) {
  const response = await api.put(`/user/${id}`, body);
  return response.data;
}