import api from '@/services/api';

export interface IRecoverPasswordProps {
  email: string;
  code: string;
  password: string;
}

export const recoverPassword = async (data: IRecoverPasswordProps) => {
  try {
    const response = await api.post('/recover-password', data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message
    );
  }
};
