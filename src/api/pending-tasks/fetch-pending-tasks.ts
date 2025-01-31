/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/models/ApiResponse";
import { PendingTask } from "@/models/PendingTask";
import api from "@/services/api";

export interface FetchPendingTasksResponse extends ApiResponse {
  data: PendingTask[]
}

export interface FetchPendingTasksProps {
  userId?: string
}

export const fetchPendingTasks = async ({ userId }: FetchPendingTasksProps) => {
  try {
    const response = await api.get("/pending-tasks", {
      params: {
        userId
      }
    });
    return response.data as FetchPendingTasksResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};