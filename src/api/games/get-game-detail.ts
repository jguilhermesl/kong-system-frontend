
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { Game } from "@/models/Game";
import { InventoryItem } from "@/models/Inventory";
import api from "@/services/api";

interface GameDetail extends Game {
  inventory: InventoryItem[],
}

export interface GetGameDetailResponse extends ApiResponse {
  data: GameDetail;
}

export const getGameDetail = async (id: string): Promise<GetGameDetailResponse> => {
  try {
    const response = await api.get(`/games/${id}`);
    return response.data as GetGameDetailResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};
