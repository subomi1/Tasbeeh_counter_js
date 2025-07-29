import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
export default function MostRecent() {
  const [data, setData] = useState([]);
  const auth = getAuth();
  const { user, loading } = useAuth();

  //   useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //       if (user) {
  //         const q = query(
  //           collection(db, "recentlyViewed"),
  //           where("id", "==", user.uid),
  //           orderBy("timestamp", "desc"),
  //           limit(3)
  //         );

  //         try {
  //           const querySnapshot = await getDocs(q);
  //           const results = querySnapshot.docs.map((doc) => doc.data());
  //           setData(results);
  //         } catch (error) {
  //           console.error("Error fetching data:", error);
  //         }
  //       } else {
  //         setData([]);
  //         console.log("No user signed in.");
  //       }
  //     });

  //     // Cleanup on unmount
  //     return () => unsubscribe();
  //   }, []);

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
  }, [user, loading]); // 👈 run when user or loading changes

  if (loading) return <p>Loading...</p>;

  console.log(data);
  return (
    <section className="p-5">
      <h1 className="w-full max-w-6xl text-[#0e141b] text-md sm:text-lg lg:text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4 mb-2">
        Most recent
      </h1>
      <ul className="flex flex-wrap gap-3 justify-center sm:justify-around">
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
            <div className="flex items-center mt-5">
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
      </ul>
    </section>
  );
}
