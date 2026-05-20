import { apiClient } from "./axios";

export const healthCheck = async (): Promise<{ message: string }> => {
  const { data } = await apiClient.get("/health");
  return data;
};