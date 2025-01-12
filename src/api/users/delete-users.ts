import api from "@/services/api";

export interface IDeleteUserProps {
  id: string,
}

export const deleteUser = async ({ id }: IDeleteUserProps) => {
  try {
    const response = await api.delete("/user/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};