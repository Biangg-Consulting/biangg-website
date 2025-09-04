import { Skeleton } from "@/components/ui/skeleton";

export const PostSkeleton = () => {
  return Array.from(Array(8)).map((_, idx) => (
    <div key={idx} className="flex flex-col space-y-3 pt-5">
      <Skeleton className="h-[350px] w-[300px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[230px]" />
        <Skeleton className="h-4 w-[210px]" />
        <Skeleton className="h-4 w-[190px]" />
      </div>
    </div>
  ));
};
