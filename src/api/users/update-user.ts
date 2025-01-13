import api from "@/services/api";


export interface IUpdateUsersBody {
  name: string,
  phone: string,
  cpf: string
  email: string
  role: "admin" | "client"
}

export async function updateUsers(body: IUpdateUsersBody, id: string) {
  const response = await api.put(`/user/${id}`, body);
  return response.data;
}