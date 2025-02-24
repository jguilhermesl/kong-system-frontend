import { ApiResponse } from '@/models/ApiResponse';
import { Financial } from '@/models/Financial';
import { User } from '@/models/User';
import api from '@/services/api';
import { AxiosError } from 'axios';

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
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error('Erro desconhecido ao buscar dashboard');
  }
};
