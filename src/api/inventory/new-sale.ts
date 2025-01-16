import api from "@/services/api";

export interface NewSaleProps { }

export async function newSale(body: NewSaleProps) {
  const response = await api.post(`/inventory/new-sale`, body);
  return response.data;
}
