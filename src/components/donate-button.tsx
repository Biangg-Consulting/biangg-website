import { Button, ButtonProps } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface DonateButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const DonateButton = ({ children, className, ...props }: DonateButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={`bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 ${className}`}
      {...props}
    >
      <Heart className="mr-2 h-4 w-4" />
      {children}
    </Button>
  );
};