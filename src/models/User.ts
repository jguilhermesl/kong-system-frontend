export interface User {
  id: string,
  email: string,
  name: string,
  createdAt: string,
  role: "admin" | "client",
  cpf: string,
  phone: string
}