
import api from "@/services/api";

interface AddInventoryRequest {
  game: string;
  email: string;
  emailPassword: string;
  psnPassword: string;
  psnUser?: string;
  gameVersion: "PS4" | "PS5" | "PS4 E PS5";
  gameValue: string;
  purchaseValue: string;
  primaryValue: string;
  secondaryValue: string;
}

export const addInventory = async (data: AddInventoryRequest) => {
  try {
    const response = await api.post("/inventory", data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};
