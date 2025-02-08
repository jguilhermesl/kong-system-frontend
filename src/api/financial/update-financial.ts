/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/services/api";

export interface UpdateFinancialProps {
  paidOrRefunded?: boolean;
  financialId?: string;
}

export const updateFinancial = async ({ financialId, paidOrRefunded }: UpdateFinancialProps) => {
  try {
    const response = await api.put("/financial/" + financialId, {
      paidOrRefunded
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};