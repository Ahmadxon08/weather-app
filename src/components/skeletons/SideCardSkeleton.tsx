import Card from "../card/Card";
import { Skeleton } from "./Skeleton";

type Props = {};

const SideCardSkeleton = (props: Props) => {
  return (
    <Card>
      <div className="flex justify-between py-1 items-center">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-5 w-6 rounded-sm" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <Skeleton className="h-4 w-10" />
      </div>

      <Skeleton className="h-2 w-full rounded-md" />

      <div className="flex justify-between text-xs mt-2">
        <Skeleton className="h-3 w-5 rounded-sm" />
        <Skeleton className="h-3 w-8 rounded-sm" />
      </div>

      <div className="flex justify-between w-full gap-3 mt-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-5 w-8 rounded-sm" />
        ))}
      </div>
    </Card>
  );
};

export default SideCardSkeleton;
