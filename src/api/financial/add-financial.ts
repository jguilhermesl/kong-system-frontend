/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/services/api";

export interface AddFinancialProps {
  productType: string;
  productName: string;
  saleValue: number;
  productValue: number;
  clientId?: string;
}

export const addFinancial = async (data: AddFinancialProps) => {
  try {
    const response = await api.post("/financial", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};
