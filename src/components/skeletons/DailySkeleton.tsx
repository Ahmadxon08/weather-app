import Card from "../card/Card";
import { Skeleton } from "./Skeleton";

type Props = {};

function DailySkeleton({}: Props) {
  const days = Array.from({ length: 7 });

  return (
    <Card title="Daily forecasts" ChildrenclassName="flex flex-col gap-4">
      {days.map((_, index) => (
        <div className="flex justify-between items-center gap-2" key={index}>
          {/* Kun */}
          <Skeleton className="w-12 h-4 rounded-md" />
          {/* Icon */}
          <Skeleton className="w-10 h-10 rounded-full" />
          {/* Temp day */}
          <Skeleton className="w-10 h-4 rounded-md" />
          {/* Temp min */}
          <Skeleton className="w-10 h-4 rounded-md" />
          {/* Temp max */}
          <Skeleton className="w-10 h-4 rounded-md" />
        </div>
      ))}
    </Card>
  );
}

export default DailySkeleton;
