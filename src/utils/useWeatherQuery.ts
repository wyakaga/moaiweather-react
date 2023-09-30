import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

import { IWeather } from "@/types/IWeather";
import APP_ID from "@/constants/appId";

const fetchWeather = async (city: string): Promise<IWeather> => {
	const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}`
	);
	return response.data;
};

export const useWeatherQuery = (city: string) => {
	const queryClient = useQueryClient();

	return useQuery({
		queryKey: ["weather", city],
		queryFn: () => fetchWeather(city),
		staleTime: 10 * (60 * 1000), //10 minutes
		initialData: () => queryClient.getQueryData(["weather", "Jakarta"]),
	});
};
