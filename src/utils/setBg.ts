import { CLOUD_FOLDER } from "@/constants/cloudinary";

const setBg = (id?: number) => {
	if (!id) return `${CLOUD_FOLDER}placeholder`;
	if (id >= 200 && id <= 232) return `${CLOUD_FOLDER}thunderstorm`;
	if (id >= 300 && id <= 321) return `${CLOUD_FOLDER}drizzle`;
	if (id >= 500 && id <= 531) return `${CLOUD_FOLDER}rain`;
	if (id >= 600 && id <= 622) return `${CLOUD_FOLDER}snow`;
	if (id >= 701 && id <= 781) return `${CLOUD_FOLDER}atmosphere`;
	if (id === 800) return `${CLOUD_FOLDER}clear_sky`;
	if (id >= 801 && id <= 804) return `${CLOUD_FOLDER}clouds`;
};

export default setBg;
