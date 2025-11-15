import Card from "../card/Card";
import { Skeleton } from "./Skeleton";

type Props = {};

function HourlySkeleton({}: Props) {
  const hours = Array.from({ length: 16 });

  return (
    <Card
      title="Hourly Forecast (48 Hours)"
      ChildrenclassName="flex gap-4 overflow-x-auto custom-scroll px-4 py-4"
    >
      {hours.map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center gap-2 backdrop-blur-md p-3 rounded-2xl min-w-[90px]"
        >
          {/* Vaqt */}
          <Skeleton className="w-12 h-4 rounded-md" />
          {/* Icon */}
          <Skeleton className="w-10 h-10 rounded-full" />
          {/* Temp */}
          <Skeleton className="w-10 h-4 rounded-md" />
        </div>
      ))}
    </Card>
  );
}

export default HourlySkeleton;
