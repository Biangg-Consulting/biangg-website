import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type SubscriptionFormProps = {
  onCancel?: () => void;
  redirectUrl?: string;
};

export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  onCancel,
  redirectUrl = "/timeline?subscription=success",
}) => {
  const [isPaymentElementReady, setIsPaymentElementReady] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_BASE_WEBSITE_URL}${redirectUrl}`,
      },
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
    }
  };

  const renderSkeleton = () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <span className="text-[14px] color-[#a1a1a1]">Card number</span>
        <Skeleton className="h-9 w-full rounded-sm" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[14px] color-[#a1a1a1]">Expiration date</span>
          <Skeleton className="h-9 w-full rounded-md" />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[14px] color-[#a1a1a1]">Security code</span>
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[14px] color-[#a1a1a1]">Country</span>
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {!isPaymentElementReady && renderSkeleton()}

      <PaymentElement
        onReady={() => setIsPaymentElementReady(true)}
        onBlur={() => setIsPaymentElementReady(true)}
      />

      <div className="flex justify-between">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          className="self-end"
          onClick={handleSubmit}
          disabled={!stripe || isLoading}
          isLoading={isLoading}
        >
          Subscribe
        </Button>
      </div>
    </form>
  );
};
