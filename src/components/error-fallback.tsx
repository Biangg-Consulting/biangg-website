import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <Card className="bg-sidebar">
        <CardContent className="flex flex-col gap-5 items-center justify-center py-5">
          <h1 className="text-2xl text-red-700 font-bold">
            Something went wrong
          </h1>
          <span className="text-lg">{error.message}</span>
          <Button onClick={resetErrorBoundary}>Try Again</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorFallback;
