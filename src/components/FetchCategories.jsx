import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FetchCategories() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      const res = await fetch("/json/dhikir.json");
      const data = await res.json();
      setData(data);
    }
    fetchdata();
  }, []);
  return (
    <div className="flex justify-center flex-wrap gap-3">
      {data?.map((data) => (
        <div
          className="flex w-full md:w-72 flex-col p-5 items-center rounded-xl overflow-hidden bg-white shadow-md transition-all duration-500 cursor-pointer ease-in-out"
          key={data.category}
        >
          <div className="image h-20 w-3/4">
            <img
              src={data.image}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <h1 className="text-lg sm:text-xl md:text-xl lg:text-xl font-bold mt-2">
            {data.category}
          </h1>
          <p className="text-center text-sm mt-1">{data.description}</p>
          <Link
            to={`/categories/${data.category.replace(/\s+/g, "")}`}
            className="px-4 py-2 rounded-md text-black flex text-center font-semibold lato border-[1px] border-[#14b766] mt-5 cursor-pointer hover:bg-[#14b766] transition-all duration-300 ease-in-out mb-auto"
          >
            {`View all ${data.category}`}
          </Link>
        </div>
      ))}
    </div>
  );
}
