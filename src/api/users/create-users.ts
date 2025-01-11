import api from "@/services/api";


export interface ICreateUsersBody {
  name: string,
  phone: string,
  cpf: string
  email: string
  password: string,
  role: "admin" | "client"
}

export async function createUsers(body: ICreateUsersBody) {
  const response = await api.post(`/user`, body);
  return response.data;
}
