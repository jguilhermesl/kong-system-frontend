/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/services/api';

export interface UpdatePointsUsageStatusProps {
  id: string;
  action: 'approved' | 'rejected';
}

export const updatePointsUsageStatus = async ({ id, action }: UpdatePointsUsageStatusProps) => {
  try {
    const response = await api.post(`/points-usage/${id}/action`, { action });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};
