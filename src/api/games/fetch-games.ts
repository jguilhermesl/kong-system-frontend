/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { Game } from "@/models/Game";
import api from "@/services/api";

export interface FetchGamesResponse extends ApiResponse {
  data: Game[]
}

export const fetchGames = async () => {
  try {
    const response = await api.get("/games");
    return response.data as FetchGamesResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};