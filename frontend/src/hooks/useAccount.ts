import { useMutation } from "@tanstack/react-query";
import { updateAccount } from "@/services/api/account";

export const useUpdateAccount = () => {
  return useMutation({
    mutationFn: updateAccount,
  });
};