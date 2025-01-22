/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { StatementItem } from "@/models/Indication";
import api from "@/services/api";

export interface FetchStatementResponse extends ApiResponse {
  data: StatementItem[],
  balance: number
}

export interface FetchStatementProps {
  userId?: string
}

export const fetchStatement = async ({ userId }: FetchStatementProps) => {
  try {
    const response = await api.get("/statement/" + userId);
    return response.data as FetchStatementResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};