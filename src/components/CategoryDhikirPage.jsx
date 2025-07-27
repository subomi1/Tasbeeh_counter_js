import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FetchContext from "../store/FetchContext";

export default function CategoryDhikirPage() {
  const fetchCtx = useContext(FetchContext);
  const data = fetchCtx.data;
  const params = useParams();
  console.log(params.categoryName);

  return (
    <section className="p-5 ">
      <ul>
        {data?.map((data) =>
          data?.category?.replace(/\s+/g, "") === params.categoryName ? (
            <li key={data.category}>
              <h1 className="text-center font-bold lato text-2xl sm:text-4xl mb-8">
                {data.category}
              </h1>
              <ul className="flex flex-wrap gap-3 justify-center">
                {data?.dhikir?.map((data) => (
                  <li
                    key={data.title}
                    className="md:w-80 border-2 border-[#14b766] p-3 flex flex-col rounded-md"
                  >
                    <h1 className="text-md sm:text-lg lg:text-lg font-bold mb-3">
                      {data.title}
                    </h1>
                    <p className="mb-5 font-semibold text-xs sm:text-sm ">
                      {data.fawaid}
                    </p>
                    <p className="font-light text-xs sm:text-sm">
                      {data.notes}
                    </p>
                    <div className="flex items-center mt-5">
                      <Link
                        to={`/categories/${
                          params.categoryName
                        }/${data.title.replace(/\s+/g, "")}`}
                        className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition hover:border-[1px] hover:border-[black] ml-auto mt-auto"
                      >
                        Count
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ) : null
        )}
      </ul>
    </section>
  );
}
