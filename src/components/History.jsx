import { useState, useEffect } from "react";
import {
  collection,
  where,
  orderBy,
  getDocs,
  query,
  limit,
} from "firebase/firestore";
import { useAuth } from "../store/AuthContext";
import timerIcon from "../assets/timer.svg";
import { db } from "../firebase";
import FavouriteButton from "./FavouriteButton";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function History() {
  const { user, loading } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user || loading) return;

    const fetchData = async () => {
      const q = query(
        collection(db, "recentlyViewed"),
        where("id", "==", user.uid),
        orderBy("timestamp", "desc"),
        limit(10)
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
  if (!user) {
    return (
      <div className="p-5 w-full h-80 flex flex-col justify-center">
        <div className="mt-8 w-full flex flex-col items-center gap-3">
          <p className="text-center text-[15px] font-bold">
            Please log in to view your past Dhikir 🙏
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
  }

  console.log(data);

  return (
    <section className="p-5">
      <h1 className="text-center font-bold lato text-2xl sm:text-4xl mb-8 border-b-2">
        Recent History
      </h1>
      {data.length > 0 ? (
        <ul className="flex flex-wrap gap-3 justify-center sm:justify-around">
          {data.map((history) => (
            <li
              key={history.fileId}
              className="md:w-80 border-2 border-[#14b766] p-3 flex flex-col rounded-md"
            >
              <h1 className="text-md sm:text-lg lg:text-lg font-bold mb-3">
                {history.title}
              </h1>
              <p className="mb-5 font-semibold text-xs sm:text-sm">
                {history.fawaid}
              </p>
              <p className="font-light text-xs sm:text-sm mb-1">
                {history.notes}
              </p>
              <p>
                {formatDistanceToNow(history.timestamp.toDate(), {
                  addSuffix: true,
                })}
              </p>
              <div className="flex items-center mt-auto">
                <FavouriteButton
                  id={history.fileId}
                  title={history.title}
                  fawaid={history.fawaid}
                  notes={history.notes}
                  catName={history.catName}
                />
                <Link
                  to={`/categories/${history.catName}/${history.title.replace(
                    /\s+/g,
                    ""
                  )}`}
                  className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition hover:border-[1px] hover:border-[black] ml-auto mt-auto"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Count
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center mt-8 justify-center gap-1 h-60">
          <img src={timerIcon} alt="" className="w-5" />
          <h1 className="sm:text-2xl">No Recent History</h1>
        </div>
      )}
    </section>
  );
}
