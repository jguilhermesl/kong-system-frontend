
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { StatementItem } from "@/models/Indication";
import { InventoryItem } from "@/models/Inventory";
import { User } from "@/models/User";
import api from "@/services/api";

interface ClientDetail extends User {
  userGames: InventoryItem[],
  statement: {
    data: StatementItem[],
    balance: number
  }
}

export interface GetClientDetailResponse extends ApiResponse {
  data: ClientDetail;
}

export const getClientDetail = async (id: string): Promise<GetClientDetailResponse> => {
  try {
    const response = await api.get(`/client/${id}/detail`);
    return response.data as GetClientDetailResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};
