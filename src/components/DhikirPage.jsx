import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import FetchContext from "../store/FetchContext";

export default function DhikirPage() {
  const fetchCtx = useContext(FetchContext);
  const data = fetchCtx.data;
  const params = useParams();
  const [current, setCurrent] = useState("");
  let cssClasses = "border-b-4 border-b-amber-500 rounded-md";
  //   if
  return (
    <section className="p-5">
      {data.map((data) =>
        data?.category?.replace(/\s+/g, "") === params.categoryName
          ? data?.dhikir?.map((data) =>
              data.title.replace(/\s+/g, "") === params.dhikir ? (
                <div key={data.title}>
                  <h1 className="text-center font-bold lato text-2xl sm:text-4xl mb-8">
                    {data.title}
                  </h1>
                  <div className="w-full flex flex-wrap justify-center items-center gap-6 sm:gap-12 md:gap-20 lg:gap-36 xl:gap-52 mb-0.5 font-semibold lato text-xs sm:text-xl">
                    <p
                      className={`transition-all duration-300 ease-in-out ${
                        current === "pronounciation"
                          ? cssClasses + " translate-y-0 opacity-100"
                          : "opacity-70"
                      } cursor-pointer`}
                      onClick={() => setCurrent("pronounciation")}
                    >
                      Pronounciation
                    </p>
                    <p
                      className={`transition-all duration-300 ease-in-out ${
                        current === "meaning"
                          ? cssClasses + " translate-y-0 opacity-100"
                          : "opacity-70"
                      } cursor-pointer`}
                      onClick={() => setCurrent("meaning")}
                    >
                      Meaning
                    </p>
                    <p
                      className={`transition-all duration-300 ease-in-out ${
                        current === "arabic"
                          ? cssClasses + " translate-y-0 opacity-100"
                          : "opacity-70"
                      } cursor-pointer`}
                      onClick={() => setCurrent("arabic")}
                    >
                      Arabic
                    </p>
                  </div>
                  <hr className="h-0.5 bg-black mt-[-2px]" />
                </div>
              ) : null
            )
          : null
      )}
    </section>
  );
}
