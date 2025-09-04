import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="w-full flex justify-center">
      <Loader2 className="mr-2 h-9 w-9 text-primary animate-spin" />
    </div>
  );
};
