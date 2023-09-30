import { IRouter } from "@/types/IRouter";
import Home from "./Home";

const pagesData: IRouter[] = [
	{
		path: "/",
		element: <Home />,
		title: "Home",
	},
];

export default pagesData;
