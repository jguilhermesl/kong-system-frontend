/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/services/api";

export interface DeleteUserProps {
  id: string,
}

export const deleteUser = async ({ id }: DeleteUserProps) => {
  try {
    const response = await api.delete("/user/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};