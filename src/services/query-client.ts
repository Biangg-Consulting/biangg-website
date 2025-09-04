import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError(error) {
        const response = error as unknown as AxiosError<API.ErrorResponse>;

        toast.error(response.response?.data?.message);
      },
    },
  },
});
