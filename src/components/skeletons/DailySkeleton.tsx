import Card from "../card/Card";
import { Skeleton } from "./Skeleton";

type Props = {};

function DailySkeleton({}: Props) {
  const days = Array.from({ length: 8 });

  return (
    <Card title="Daily forecasts" ChildrenclassName="">
      <div className="flex flex-1 flex-col gap-4">
        {days.map((_, index) => (
          <div
            className="flex justify-between items-center gap-4 w-full"
            key={index}
          >
            {/* Kun */}
            <Skeleton className="w-12 h-8 rounded-md" />
            {/* Icon */}
            <Skeleton className="w-7 h-7 rounded-full" />
            {/* Temp day */}
            <Skeleton className="w-10 h-4 rounded-md" />
            {/* Temp min */}
            <Skeleton className="w-10 h-4 rounded-md" />
            {/* Temp max */}
            <Skeleton className="w-10 h-4 rounded-md" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default DailySkeleton;
