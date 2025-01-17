import api from "@/services/api";

export interface NewSaleProps {
  inventoryId: string,
  clientId: string,
  saleValue: number,
  sellerName: string,
  indicationCode?: string
}

export async function newSale({ clientId, saleValue, sellerName, indicationCode, inventoryId }: NewSaleProps) {
  const response = await api.patch(`/inventory/${inventoryId}`, {
    clientId,
    saleValue,
    sellerName,
    indicationCode,
  });
  return response.data;
}
