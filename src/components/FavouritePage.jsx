import { useState, useEffect } from "react";
import { useAuth } from "../store/AuthContext";
import { db } from "../firebase";
import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import FavouriteButton from "./FavouriteButton";
import { Link } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { doc, setDoc, serverTimestamp  } from "firebase/firestore";

export default function FavouritePage() {
  const [data, setData] = useState([]);
  const { user, loading } = useAuth();
  const auth = getAuth();

  const onchange = data.length;

  useEffect(() => {
    if (!user || loading) return;

    const fetchData = async () => {
      const q = query(
        collection(db, "favourite"),
        where("userid", "==", user.uid),
        orderBy("timestamp", "desc")
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
  }, [user, loading, onchange]);

  function handleRecents(id, title, fawaid, notes, catName) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const recentref = doc(db, "recentlyViewed", `${id}_${user.uid}`);
        await setDoc(recentref, {
          id: user.uid,
          title,
          fawaid,
          notes,
          fileId: id,
          catName,
          timestamp: serverTimestamp(),
        });
        console.log("User is signed in, UID:", user.uid);
      } else {
        console.log("No user signed in.");
      }
    });
  }

  return (
    <section className="p-5">
      <h1 className="text-center font-bold lato text-2xl sm:text-4xl mb-8 border-b-2">
        Favourite
      </h1>
      <ul className="flex flex-wrap gap-3 justify-center">
        {data.map((favourite) => (
          <li
            key={favourite.id}
            className="md:w-80 border-2 border-[#14b766] p-3 flex flex-col rounded-md"
          >
            <h1 className="text-md sm:text-lg lg:text-lg font-bold mb-3">
              {favourite.title}
            </h1>
            <p className="mb-5 font-semibold text-xs sm:text-sm ">
              {favourite.fawaid || "No description"}
            </p>
            <p className="font-light text-xs sm:text-sm">{favourite.notes}</p>
            <div className="flex items-center mt-auto">
              <FavouriteButton
                id={favourite.id}
                title={favourite.title}
                notes={favourite.notes}
                fawaid={favourite.fawaid}
                catName={favourite.catName}
              />
              <Link
                to={`/categories/${favourite.catName}/${favourite.title.replace(
                  /\s+/g,
                  ""
                )}`}
                className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition hover:border-[1px] hover:border-[black] ml-auto mt-auto"
                onClick={() =>
                  handleRecents(
                    favourite.id,
                    favourite.title,
                    favourite.fawaid,
                    favourite.notes,
                    favourite.catName
                  )
                }
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
