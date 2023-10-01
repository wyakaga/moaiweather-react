import { IRouter } from "@/types/IRouter";
import Home from "./Home";
import NotFound from "./NotFound";

const pagesData: IRouter[] = [
  {
    path: "/",
    element: <Home />,
    title: "Home",
  },
  {
    path: "*",
    element: <NotFound />,
    title: "Not Found",
  },
];

export default pagesData;
