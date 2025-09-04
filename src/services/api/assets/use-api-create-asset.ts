import { queryClient } from "@/services/query-client";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

const createAsset = async (data: FormData) => {
  const response = await api.post<{
    payload: {
      assetKey: string;
    };
  }>("/assets", data);

  return response.data.payload;
};

export const useApiCreateAsset = () => {
  return useMutation({
    mutationFn: createAsset,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
