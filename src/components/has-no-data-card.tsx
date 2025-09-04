import { Alert, AlertTitle } from "@/components/ui/alert";
import { CircleOff } from "lucide-react";
import { Button } from "./ui/button";

type HasNoDataCardProps = {
  title: string;
  btnTitle?: string;
  onBtnClick?: () => void;
};

export const HasNoDataCard: React.FC<HasNoDataCardProps> = ({
  title,
  btnTitle,
  onBtnClick,
}) => {
  return (
    <Alert className="flex justify-center">
      <div className="flex flex-col gap-3">
        <CircleOff className="h-6 w-6 self-center" />
        <div className="text-center lg:text-justify">
          <AlertTitle className="text-[13px] lg:text-xl">{title}</AlertTitle>
        </div>

        {btnTitle && (
          <div className="self-center" onClick={onBtnClick}>
            <Button size="sm">{btnTitle}</Button>
          </div>
        )}
      </div>
    </Alert>
  );
};
