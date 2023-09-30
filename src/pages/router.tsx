import { Route, Routes } from "react-router-dom";

import { IRouter } from "@/types/IRouter";
import pagesData from "./pagesData";

const Router = () => {
	const pageRoutes = pagesData.map(({ path, title, element }: IRouter) => {
		return <Route key={title} path={`/${path}`} element={element} />;
	});

	return <Routes>{pageRoutes}</Routes>;
};

export default Router;
