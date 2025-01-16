import api from "@/services/api";

export interface NewSaleProps {
  inventoryId: string,
  clientId: string,
  saleValue: number,
  sellerName: string,
  codeIndication?: string
}

export async function newSale({ clientId, saleValue, sellerName, codeIndication, inventoryId }: NewSaleProps) {
  const response = await api.patch(`/inventory/${inventoryId}`, {
    clientId,
    saleValue,
    sellerName,
    codeIndication,
  });
  return response.data;
}
