import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import useDocumentTitle from "@/utils/useDocumentTitle";

function NotFound() {
  const navigate = useNavigate();

  useDocumentTitle("Not Found");

  return (
    <div className="flex justify-center min-h-screen p-5 md:p-40 bg-not-found bg-cover bg-no-repeat bg-center">
      <div className="w-full flex flex-col justify-center items-center gap-y-10 p-2 md:p-5 font-inter text-slate-50 bg-white/5 backdrop-filter backdrop-blur-xl rounded-[12px] border border-solid border-[rgba(209,213,219,0.3)]">
        <div className="flex flex-col gap-y-5 text-center">
          <p className="text-6xl font-bold">Oops...</p>
          <p className="text-4xl font-semibold">
            The page you were looking for does not exist
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="group w-3/4 flex flex-row justify-center items-center gap-x-2 rounded-md p-4 bg-rose-600 hover:bg-rose-700 font-semibold duration-300"
        >
          <ChevronLeft className="h-8 w-8 transform group-hover:-translate-x-2 duration-300" />
          <p className="text-xl">Head home</p>
        </button>
      </div>
    </div>
  );
}

export default NotFound;
