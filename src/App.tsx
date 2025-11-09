import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./api";
import DailyCard from "./components/card/DailyCard";
import HourlyCard from "./components/card/HourlyCard";
import CurrentCard from "./components/card/CurrentCard";
import AdditionalInfo from "./components/card/AdditionalInfo";

const App = () => {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });

  console.log(data);

  return (
    <div className="flex justify-center flex-col items-center bg-gray-800 gap-3.5 p-4">
      <CurrentCard />
      <HourlyCard />

      <DailyCard />
      <AdditionalInfo />
    </div>
  );
};

export default App;
