import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./api";

const App = () => {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });

  console.log(data);

  return (
    <div className="flex justify-center items-center p-5 bg-amber-500 w-full h-screen">
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Yuklanmoqda...</p>
      )}
    </div>
  );
};

export default App;
