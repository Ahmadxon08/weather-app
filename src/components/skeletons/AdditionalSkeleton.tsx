import Card from "../card/Card";
import { Skeleton } from "./Skeleton";

type Props = {};

function AdditionalSkeleton({}: Props) {
  const rows = [
    {
      label: "Feels like",
      icon: () => <div className="w-5 h-5 bg-gray-500 rounded-full" />,
    },
    {
      label: "Humidity",
      icon: () => <div className="w-5 h-5 bg-gray-500 rounded-full" />,
    },
    {
      label: "Wind Speed",
      icon: () => <div className="w-5 h-5 bg-gray-500 rounded-full" />,
    },
    {
      label: "Pressure",
      icon: () => <div className="w-5 h-5 bg-gray-500 rounded-full" />,
    },
  ];

  return (
    <Card
      title="Additional Weather Info"
      ChildrenclassName="flex flex-col gap-6"
    >
      {rows.map((row, index) => {
        const Icon = row.icon;
        return (
          <div
            key={index}
            className="flex justify-between items-center text-white/90"
          >
            <div className="flex items-center gap-3">
              <Icon />
              <Skeleton className="w-24 h-4 rounded-md" />
            </div>
            <Skeleton className="w-16 h-4 rounded-md" />
          </div>
        );
      })}
    </Card>
  );
}

export default AdditionalSkeleton;
