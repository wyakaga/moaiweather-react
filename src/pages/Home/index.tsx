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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import cityData from "@/constants/cityData";

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
      <div className="overlay w-full min-h-screen lg:h-full bg-black/40 absolute top-0 left-0"></div>
      {!isLoading ? (
        <AdvancedVideo
          autoPlay
          loop
          muted
          className="w-full min-h-screen lg:h-full object-fill lg:object-cover lg:object-center pointer-events-none"
          cldVid={cld.video(setBg(data?.weather[0].id)).quality("auto")}
        />
      ) : (
        <AdvancedImage cldImg={cld.image(setBg()).quality("auto")} />
      )}
      <div className="content w-full h-full absolute top-0 flex flex-col gap-y-5 lg:gap-y-20 p-5 lg:p-20 font-inter">
        <section className="top-side flex justify-end gap-x-5">
          <Select onValueChange={handleSelect}>
            <SelectTrigger className="md:w-1/5 bg-slate-50">
              <SelectValue placeholder="Choose city" />
            </SelectTrigger>
            <SelectContent>
              {cityData.map((city) => (
                <SelectItem value={city.value}>{city.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={"https://www.github.com/wyakaga/moaiweather-react"}>
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
        <section className="main flex flex-col items-center justify-center md:gap-y-2 lg:gap-y-5 py-2 md:py-5 lg:py-10 bg-white/10 backdrop-filter backdrop-blur-xl rounded-[12px] border border-solid border-[rgba(209,213,219,0.3)]">
          <section className="summary flex flex-col items-center text-slate-50 w-full md:h-1/2">
            {isLoading ? (
              <Skeleton className="h-8 w-[500px]" />
            ) : (
              <p className="text-lg lg:text-2xl">
                {data?.name}, {regionConvert(data?.sys.country)}
              </p>
            )}
            {isLoading ? (
              <Skeleton className="h-36 w-[500px]" />
            ) : (
              <div className="flex items-center">
                <div className="w-20 lg:w-36 h-20 lg:h-36 flex">
                  <img
                    src={setIcon(data?.weather[0].icon)}
                    alt="current weather icon"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-start">
                  <p className="text-4xl lg:text-7xl font-medium">
                    {Math.round(data?.main.temp || 0)}
                  </p>
                  <p>°C</p>
                </div>
              </div>
            )}
            {isLoading ? (
              <Skeleton className="h-8 w-[500px]" />
            ) : (
              <div className="texts flex flex-col items-center gap-y-4">
                <p className="text-lg lg:text-2xl font-light">
                  {data?.weather[0].description}
                </p>
              </div>
            )}
          </section>
          <Separator decorative className="w-3/4 m-3" />
          <section className="details flex flex-col gap-y-2 md:gap-y-8 text-slate-50 w-10/12 md:w-3/4 md:h-1/2">
            {isLoading ? (
              <div className="flex items-center">
                <Skeleton className="h-8 w-[500px]" />
              </div>
            ) : (
              <p className="text-base lg:text-xl text-center">{setDate()}</p>
            )}
            <div className="flex flex-row md:flex-col md:gap-y-5">
              {isLoading ? (
                <Skeleton className="h-12 w-3/4" />
              ) : (
                <div className="flex flex-col gap-y-5 md:flex-row w-1/2 md:w-full justify-between">
                  <div className="feels-temp flex items-center gap-x-2">
                    <Thermometer className="h-6 md:h-10 lg:h-12 w-6 md:w-10 lg:w-12" />
                    <div className="flex flex-col">
                      <p className="text-sm lg:text-base">Feels like</p>
                      <p className="text-sm lg:text-base font-medium">
                        {Math.round(data?.main.feels_like || 0)}°C
                      </p>
                    </div>
                  </div>
                  <div className="min-temp flex items-center gap-x-2">
                    <ThermometerSnowflake className="h-6 md:h-10 lg:h-12 w-6 md:w-10 lg:w-12" />
                    <div className="flex flex-col">
                      <p className="text-sm lg:text-base">Min. Temp</p>
                      <p className="text-sm lg:text-base font-medium">
                        {Math.round(data?.main.temp_min || 0)}°C
                      </p>
                    </div>
                  </div>
                  <div className="max-temp flex items-center gap-x-2">
                    <ThermometerSun className="h-6 md:h-10 lg:h-12 w-6 md:w-10 lg:w-12" />
                    <div className="flex flex-col">
                      <p className="text-sm lg:text-base">Max. Temp</p>
                      <p className="text-sm lg:text-base font-medium">
                        {Math.round(data?.main.temp_max || 0)}°C
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {isLoading ? (
                <Skeleton className="h-12 w-3/4" />
              ) : (
                <div className="flex flex-col gap-y-5 md:flex-row w-1/2 md:w-full justify-between">
                  <div className="humidity flex items-center gap-x-2">
                    <Droplets className="h-6 md:h-10 lg:h-12 w-6 md:w-10 lg:w-12" />
                    <div className="flex flex-col">
                      <p className="text-sm lg:text-base">Humidity</p>
                      <p className="text-sm lg:text-base font-medium">
                        {data?.main.humidity}%
                      </p>
                    </div>
                  </div>
                  <div className="wind-speed flex items-center gap-x-2">
                    <Wind className="h-6 md:h-10 lg:h-12 w-6 md:w-10 lg:w-12" />
                    <div className="flex flex-col">
                      <p className="text-sm lg:text-base">Wind speed</p>
                      <p className="text-sm lg:text-base font-medium">
                        {data?.wind.speed} m/s
                      </p>
                    </div>
                  </div>
                  <div className="pressure flex items-center gap-x-2">
                    <GaugeCircle className="h-6 md:h-10 lg:h-12 w-6 md:w-10 lg:w-12" />
                    <div className="flex flex-col">
                      <p className="text-sm lg:text-base">Pressure</p>
                      <p className="text-sm lg:text-base font-medium">
                        {data?.main.pressure} hPa
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}

export default Home;
