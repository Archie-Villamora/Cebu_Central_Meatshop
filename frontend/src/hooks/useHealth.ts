import { useQuery } from "@tanstack/react-query";
import { healthCheck } from "@/services/api/health";

export const useHealthCheck = () => {
  return useQuery({
    queryKey: ["health"],
    queryFn: healthCheck,
    retry: 1,
  });
};