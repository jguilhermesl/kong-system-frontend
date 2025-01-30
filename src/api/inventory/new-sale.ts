import api from "@/services/api";

export interface NewSaleProps {
  inventoryId: string,
  clientId: string,
  saleValue: number,
  sellerId: string,
  indicationCode?: string
}

export async function newSale({ clientId, saleValue, sellerId, indicationCode, inventoryId }: NewSaleProps) {
  const response = await api.patch(`/inventory/${inventoryId}`, {
    clientId,
    saleValue,
    sellerId,
    indicationCode,
  });
  return response.data;
}
