/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/services/api';

export interface RequestGameProps {
  storeItemId: string;
}

export const requestGame = async ({ storeItemId }: RequestGameProps) => {
  try {
    const response = await api.post('/request-game', { storeItemId });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};
