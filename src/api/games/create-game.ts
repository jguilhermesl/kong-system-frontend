/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/services/api";

export interface CreateGameProps {
  name: string,
  psnLink: string,
  imageLink: string
}

export async function createGame(body: CreateGameProps) {
  try {
    const response = await api.post(`/games`, body);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
}
