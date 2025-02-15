/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/services/api';

export interface IForgotPasswordProps {
  email: string;
}

export const forgotPassword = async (data: IForgotPasswordProps) => {
  try {
    const response = await api.post('/forgot-password', data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message
    );
  }
};
