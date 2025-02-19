/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/services/api";

export interface DeleteGameProps {
  id: string,
}

export const deleteGame = async ({ id }: DeleteGameProps) => {
  try {
    const response = await api.delete("/games/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};