import Card from "../card/Card";
import { Skeleton } from "./Skeleton";

type Props = {};

function CurrentSkeleton({}: Props) {
  return (
    <Card
      title="Current Weather"
      ChildrenclassName="flex justify-center flex-col gap-6 items-center"
    >
      <div className="flex flex-col items-center gap-4.5">
        <Skeleton className="h-16 w-32 rounded-lg" />
        <Skeleton className="h-11 w-11 rounded-full" />

        <Skeleton className="h-8 w-46 rounded-lg" />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-center text-white">Local time:</p>
        <Skeleton className="h-12 w-44 rounded-lg" />
      </div>

      <div className="flex justify-between  w-full">
        <div className="flex text-white flex-col items-center gap-3">
          <p>Feels like</p>
          <Skeleton className="h-6 w-12 rounded-lg" />
        </div>
        <div className="flex text-white flex-col items-center gap-3">
          <p>Humidity</p>
          <Skeleton className="h-4 w-12 rounded-lg" />
        </div>
        <div className="flex text-white flex-col items-center gap-3">
          <p>Wind Speed</p>
          <Skeleton className="h-4 w-12 rounded-lg" />
        </div>
      </div>
    </Card>
  );
}

export default CurrentSkeleton;
