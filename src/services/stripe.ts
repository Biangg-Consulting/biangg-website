import { loadStripe } from "@stripe/stripe-js";

export async function getStripeJS() {
  const stripejs = await loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  );

  return stripejs;
}

export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

export const stripeAppearance = {
  theme: "night" as const,
  variables: {
    fontFamily: "Arial, sans-serif",
    fontLineHeight: "1.5",
    borderRadius: "8px",
    colorPrimary: "#6d28d9",
    colorBackground: "#1a1a1a",
    colorText: "#ffffff",
    colorTextSecondary: "#a1a1a1",
    spacingUnit: "5px",
    colorDanger: "#ff4d4f",
  },
  rules: {
    ".Input": {
      padding: "10px",
      backgroundColor: "transparent",
      border: "1px solid #222",
      color: "#ffffff",
    },
    ".Label": {
      color: "#a1a1a1",
    },
    ".Tab": {
      backgroundColor: "#2a2a2a",
      border: "1px solid #444",
      color: "#ffffff",
    },
    ".Block": {
      backgroundColor: "#18181b",
    },
  },
};
