import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import timerIcon from '../assets/timer.svg';
import FavouriteButton from "./FavouriteButton";


export default function MostRecent() {
  const [data, setData] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user || loading) return;

    const fetchData = async () => {
      const q = query(
        collection(db, "recentlyViewed"),
        where("id", "==", user.uid), // ✅ use correct field
        orderBy("timestamp", "desc"),
        limit(3)
      );

      try {
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => doc.data());
        setData(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, loading]);
  if (loading) return <p>Loading...</p>;
  if (!user)
    return (
      <div className="p-5 w-full h-60">
        <h1 className="w-full max-w-6xl text-[#0e141b] text-md sm:text-lg lg:text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4 mb-2">
          {" "}
          Most recent
        </h1>
        <div className="mt-8 w-full flex flex-col items-center gap-3">
          <p className="text-center text-[15px] font-bold">
            Please log in to view your recent Dhikir 🙏
          </p>{" "}
          <Link
            to="/login"
            className="bg-[#14b766] px-4 py-2 rounded-md text-white flex text-center font-semibold lato"
          >
            Login
          </Link>
        </div>
      </div>
    );

  console.log(data);
  return (
    <section className="p-5" id="recent">
      <h1 className="w-full max-w-6xl text-[#0e141b] text-md sm:text-lg lg:text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4 mb-2">
        Most recent
      </h1>
      {data.length > 0 ?       <ul className="flex flex-wrap gap-3 justify-center sm:justify-around">
        {data.map((recent) => (
          <li
            key={recent.fileId}
            className="md:w-80 border-2 border-[#14b766] p-3 flex flex-col rounded-md"
          >
            <h1 className="text-md sm:text-lg lg:text-lg font-bold mb-3">
              {recent.title}
            </h1>
            <p className="mb-5 font-semibold text-xs sm:text-sm">
              {recent.fawaid}
            </p>
            <p className="font-light text-xs sm:text-sm">{recent.notes}</p>
            <div className="flex items-center mt-auto">
                <FavouriteButton id={recent.fileId} title={recent.title} fawaid={recent.fawaid} notes={recent.notes} catName={recent.catName}/>
              <Link
                to={`/categories/${recent.catName}/${recent.title.replace(
                  /\s+/g,
                  ""
                )}`}
                className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition hover:border-[1px] hover:border-[black] ml-auto mt-auto"
              >
                Count
              </Link>
            </div>
          </li>
        ))}
      </ul> :
        <div className="flex items-center mt-8 justify-center gap-1">
            <img src={timerIcon} alt="" className="w-5"/>
            <h1>No Recent Dhikir</h1>
        </div> 
      }
    </section>
  );
}
