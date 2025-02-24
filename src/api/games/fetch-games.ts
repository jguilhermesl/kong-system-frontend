/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { Game } from "@/models/Game";
import api from "@/services/api";

export interface FetchGamesResponse extends ApiResponse {
  data: Game[]
}

interface FetchGamesProps {
  search?: string
}

export const fetchGames = async ({ search }: FetchGamesProps) => {
  try {
    const response = await api.get("/games", {
      params: {
        search
      }
    });
    return response.data as FetchGamesResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};