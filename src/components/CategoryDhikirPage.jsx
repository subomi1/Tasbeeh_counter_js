import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CategoryDhikirPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/json/dhikir.json");
      const res = await response.json();
      setData(res);
    }
    fetchData();
  }, []);
  // setFilteredData(data[])
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
                {data.dhikir.map((data) => (
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
                    <Link className="ml-auto mt-auto">
                        Count your
                    </Link>
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
