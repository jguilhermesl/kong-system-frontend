/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/services/api";

export interface DeleteIndicationProps {
  id: string,
}

export const deleteIndication = async ({ id }: DeleteIndicationProps) => {
  try {
    const response = await api.delete("/indications/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};