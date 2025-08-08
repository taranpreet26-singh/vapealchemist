import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full relative rounded-3xl overflow-hidden max-w-md mx-auto bg-neutral-900 p-8">
        <div className="relative z-10 space-y-4">
          <Skeleton className="w-full h-[400px] rounded-2xl bg-black" />
          <div className="space-y-2 ">
            <Skeleton className="h-6 w-3/4 " /> 
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
