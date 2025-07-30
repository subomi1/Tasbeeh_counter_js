import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FetchContext from "../store/FetchContext";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { useAuth } from "../store/AuthContext";
import FavouriteButton from "./FavouriteButton";

export default function CategoryDhikirPage() {
  const fetchCtx = useContext(FetchContext);
  const data = fetchCtx.data;
  const params = useParams();
  console.log(params.categoryName);
  const auth = getAuth();
  const {user, loading} = useAuth();
  

  function handleRecents(id, title, fawaid, notes, catName) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const recentref = doc(db, "recentlyViewed", `${id}_${user.uid}`);
        await setDoc(recentref, {
            id : user.uid,
            title,
            fawaid,
            notes,
            fileId: id,
            catName,
            timestamp: serverTimestamp()
        })
        console.log("User is signed in, UID:", user.uid);
      } else {
        console.log("No user signed in.");
      }
    });
  }

  return (
    <section className="p-5 ">
      <ul>
        {data?.map((data) =>
          data?.category?.replace(/\s+/g, "") === params.categoryName ? (
            <li key={data.category}>
              <h1 className="text-center font-bold lato text-2xl sm:text-4xl mb-8 border-b-2">
                {data.category}
              </h1>
              <ul className="flex flex-wrap gap-3 justify-center">
                {data?.dhikir?.map((data) => (
                  <li
                    key={data.id}
                    className="md:w-80 border-2 border-[#14b766] p-3 flex flex-col rounded-md"
                  >
                    <h1 className="text-md sm:text-lg lg:text-lg font-bold mb-3">
                      {data.title}
                    </h1>
                    <p className="mb-5 font-semibold text-xs sm:text-sm ">
                      {data.fawaid || "No description"}
                    </p>
                    <p className="font-light text-xs sm:text-sm">
                      {data.notes}
                    </p>
                    <div className="flex items-center mt-auto">
                        <FavouriteButton id={data.id} title={data.title} notes={data.notes} fawaid={data.fawaid} catName={params.categoryName}/>
                      <Link
                        to={`/categories/${
                          params.categoryName
                        }/${data.title.replace(/\s+/g, "")}`}
                        className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition hover:border-[1px] hover:border-[black] ml-auto mt-auto"
                        onClick={() =>
                          handleRecents(
                            data.id,
                            data.title,
                            data.fawaid,
                            data.notes,
                            params.categoryName,
                          )
                        }
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
