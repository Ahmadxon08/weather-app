import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./api";
import Card from "./components/card/Card";
import DailyCard from "./components/card/DailyCard";

const App = () => {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });

  console.log(data);

  return (
    <div className="flex justify-center flex-col items-center bg-amber-500  h-screen p-5">
      <Card title="Current Weather">
        {JSON.stringify(data?.current).slice(0, 100)}
      </Card>

      <DailyCard />
    </div>
  );
};

export default App;
