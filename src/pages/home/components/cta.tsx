import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

type CTAProps = {
  learnMoreHref?: string;
};

export const CTA = ({ learnMoreHref = "#features" }: CTAProps) => {
  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <div className="flex flex-row gap-4 sm:gap-5 items-center">
      <Button onClick={navigateToSignIn} className="w-full sm:w-32 rounded-lg">
        Get started
      </Button>
      <a
        href={learnMoreHref}
        className={cn(
          buttonVariants({
            variant: "outline",
            className:
              "w-full sm:w-32 rounded-lg cursor-pointer bg-[#121214]",
          })
        )}
      >
        Learn more
      </a>
    </div>
  );
};