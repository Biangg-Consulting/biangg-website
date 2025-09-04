import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

type CreateCheckoutSessionParams = {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
};

async function createCheckoutSession(params: CreateCheckoutSessionParams) {
  const { data } = await api.post<{ payload: { checkoutSessionId: string } }>(
    "/subscriptions/checkout-session",
    params
  );

  return data;
}

export function useApiCreateCheckoutSession() {
  return useMutation({
    mutationFn: createCheckoutSession,
  });
}
