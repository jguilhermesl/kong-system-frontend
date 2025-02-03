/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/services/api";

export interface DeleteFinancialProps {
  id: string,
}

export const deleteFinancial = async ({ id }: DeleteFinancialProps) => {
  try {
    const response = await api.delete("/financial/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};