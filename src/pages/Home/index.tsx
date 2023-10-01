import { useState } from "react";
import { Link } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo, AdvancedImage } from "@cloudinary/react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
	ThermometerSnowflake,
	ThermometerSun,
	Thermometer,
	Droplets,
	Wind,
	GaugeCircle,
} from "lucide-react";

import { useWeatherQuery } from "@/utils/useWeatherQuery";
import { CLOUD_NAME } from "@/constants/cloudinary";
import setBg from "@/utils/setBg";
import regionConvert from "@/utils/regionConvert";
import setDate from "@/utils/setDate";
import setIcon from "@/utils/setIcon";

function Home() {
	const cld = new Cloudinary({
		cloud: {
			cloudName: CLOUD_NAME,
		},
		url: {
			secure: true,
		},
	});

	const [city, setCity] = useState("Jakarta");

	const { data, isLoading } = useWeatherQuery(city);

	const handleSelect = (e: string) => {
		setCity(e);
	};

	return (
		<div className="body-wrapper grid grid-cols-1 grid-rows-1 relative">
			<div className="overlay w-full h-full bg-black/40 absolute top-0 left-0"></div>
			{!isLoading ? (
				<AdvancedVideo
					autoPlay
					loop
					muted
					className="w-full h-full object-cover object-center pointer-events-none"
					cldVid={cld.video(setBg(data?.weather[0].id)).quality("auto")}
				/>
			) : (
				<AdvancedImage cldImg={cld.image(setBg()).quality("auto")} />
			)}
			<div className="content w-full h-full absolute top-0 flex flex-col gap-y-20 p-20 font-inter">
				<section className="top-side flex justify-end gap-x-5">
					<Select onValueChange={handleSelect}>
						<SelectTrigger className="w-1/5 bg-slate-50">
							<SelectValue placeholder="Choose city" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Jakarta">Jakarta, DKI Jakarta</SelectItem>
							<SelectItem value="Medan">Medan, North Sumatra</SelectItem>
							<SelectItem value="Balikpapan">Balikpapan, East Kalimantan</SelectItem>
							<SelectItem value="Makassar">Makassar, South Sulawesi</SelectItem>
							<SelectItem value="Jayapura">Jayapura, Papua</SelectItem>
						</SelectContent>
					</Select>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link to={"https://www.github.com/wyakaga"}>
									<Button variant={"secondary"} size={"icon"}>
										<GitHubLogoIcon className="h-4 w-4" />
									</Button>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="bottom" sideOffset={10}>
								<p>Source code</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</section>
				<section className="main flex flex-col items-center justify-center gap-y-5 py-10 bg-white/10 backdrop-filter backdrop-blur-xl rounded-[12px] border border-solid border-[rgba(209,213,219,0.3)]">
					<section className="summary flex flex-col items-center text-slate-50 w-full h-1/2">
						{isLoading ? (
							<Skeleton className="h-8 w-[500px]" />
						) : (
							<p className="text-2xl">
								{data?.name}, {regionConvert(data?.sys.country)}
							</p>
						)}
						{isLoading ? (
							<Skeleton className="h-36 w-[500px]" />
						) : (
							<div className="flex items-center">
								<div className="w-36 h-36 flex">
									<img
										src={setIcon(data?.weather[0].icon)}
										alt="current weather icon"
										className="object-cover"
									/>
								</div>
								<div className="flex items-start">
									<p className="text-7xl font-medium">{Math.round(data?.main.temp || 0)}</p>
									<p>°C</p>
								</div>
							</div>
						)}
						{isLoading ? (
							<Skeleton className="h-8 w-[500px]" />
						) : (
							<div className="texts flex flex-col items-center gap-y-4">
								<p className="text-2xl font-light">{data?.weather[0].description}</p>
							</div>
						)}
					</section>
					<Separator decorative className="w-3/4 m-3" />
					<section className="details flex flex-col gap-y-8 text-slate-50 w-3/4 h-1/2">
						{isLoading ? (
							<div className="flex items-center">
								<Skeleton className="h-8 w-[500px]" />
							</div>
						) : (
							<p className="text-xl text-center">{setDate()}</p>
						)}
						{isLoading ? (
							<Skeleton className="h-12 w-3/4" />
						) : (
							<div className="flex w-full justify-between">
								<div className="feels-temp flex items-center gap-x-2">
									<Thermometer className="h-12 w-12" />
									<div className="flex flex-col">
										<p>Feels like</p>
										<p className="font-medium">{Math.round(data?.main.feels_like || 0)}°C</p>
									</div>
								</div>
								<div className="min-temp flex items-center gap-x-2">
									<ThermometerSnowflake className="h-12 w-12" />
									<div className="flex flex-col">
										<p>Min. Temp</p>
										<p className="font-medium">{Math.round(data?.main.temp_min || 0)}°C</p>
									</div>
								</div>
								<div className="max-temp flex items-center gap-x-2">
									<ThermometerSun className="h-12 w-12" />
									<div className="flex flex-col">
										<p>Max. Temp</p>
										<p className="font-medium">{Math.round(data?.main.temp_max || 0)}°C</p>
									</div>
								</div>
							</div>
						)}
						{isLoading ? (
							<Skeleton className="h-12 w-3/4" />
						) : (
							<div className="flex w-full justify-between">
								<div className="humidity flex items-center gap-x-2">
									<Droplets className="h-12 w-12" />
									<div className="flex flex-col">
										<p>Humidity</p>
										<p className="font-medium">{data?.main.humidity}%</p>
									</div>
								</div>
								<div className="wind-speed flex items-center gap-x-2">
									<Wind className="h-12 w-12" />
									<div className="flex flex-col">
										<p>Wind speed</p>
										<p className="font-medium">{data?.wind.speed} m/s</p>
									</div>
								</div>
								<div className="pressure flex items-center gap-x-2">
									<GaugeCircle className="h-12 w-12" />
									<div className="flex flex-col">
										<p>Pressure</p>
										<p className="font-medium">{data?.main.pressure} hPa</p>
									</div>
								</div>
							</div>
						)}
					</section>
				</section>
			</div>
		</div>
	);
}

export default Home;
