/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/services/api";

interface AddInventoryRequest {
  game: string;
  email: string;
  emailPassword: string;
  psnPassword: string;
  psnUser?: string;
  gameVersion: "PS4" | "PS5" | "PS4 E PS5";
  gameValue: number;
  purchaseValue: number;
  primaryValue: number;
  secondaryValue: number;
}

export const addInventory = async (data: AddInventoryRequest) => {
  try {
    const response = await api.post("/inventory", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};
