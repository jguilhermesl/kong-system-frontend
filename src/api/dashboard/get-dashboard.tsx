/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from '@/models/ApiResponse';
import { Financial } from '@/models/Financial';
import { User } from '@/models/User';
import api from '@/services/api';

export interface DashboardResponse {
  latestUsers: User[];
  activeUsersCount: {
    adminUsers: number;
    clientUsers: number;
  };
  latestSales: Financial[];
}

export interface GetDashboardResponse extends ApiResponse {
  data: DashboardResponse;
}

export const getDashboard = async (): Promise<GetDashboardResponse> => {
  try {
    const response = await api.get<GetDashboardResponse>(`/dashboard`);
    return response.data;
  } catch (error) {
    throw new Error(
      (error as any)?.response?.data?.message || (error as Error)?.message
    );
  }
};
