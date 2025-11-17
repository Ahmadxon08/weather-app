import SideCardSkeleton from "./SideCardSkeleton";
import { Skeleton } from "./Skeleton";

type Props = {};

function SidePanelSkeleton({}: Props) {
  return (
    <div className="flex gap-2 p-2 flex-col">
      <Skeleton className="h-7 w-40" />
      <Skeleton className="h-10 w-14" />
      <div className="flex gap-3 items-center">
        <Skeleton className="h-6 w-7" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      {Array.from({ length: 9 }).map((_, i) => (
        <SideCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default SidePanelSkeleton;
