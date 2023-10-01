import { Link } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from "@cloudinary/react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

// import { useWeatherQuery } from "@/utils/useWeatherQuery"
import { CLOUD_NAME } from "@/constants/cloudinary";
import setBg from "@/utils/setBg";

function Home() {
	const cld = new Cloudinary({
		cloud: {
			cloudName: CLOUD_NAME,
		},
		url: {
			secure: true,
		},
	});

	// const { data } = useWeatherQuery("Jakarta")

	const handleSelect = (e: string) => {
		console.log(e);
	};

	return (
		<div className="body-wrapper grid grid-cols-1 grid-rows-1 relative">
			<div className="overlay w-full h-full bg-black/40 absolute top-0 left-0"></div>
			<AdvancedVideo
				autoPlay
				loop
				muted
				className="w-full h-full object-cover object-center pointer-events-none"
				cldVid={cld.video(setBg(600)).quality("auto")}
			/>
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
        <section className="main bg-white/30 backdrop-filter backdrop-blur-xl rounded-[12px] border border-solid border-[rgba(209,213,219,0.3)]">
          
        </section>
			</div>
		</div>
	);
}

export default Home;
