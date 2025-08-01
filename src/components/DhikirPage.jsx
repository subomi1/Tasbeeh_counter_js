import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FetchContext from "../store/FetchContext";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../store/AuthContext";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";

export default function DhikirPage() {
  const fetchCtx = useContext(FetchContext);
  const data = fetchCtx.data;
  const params = useParams();
  const [current, setCurrent] = useState("arabic");
  const count = useSelector((state) => state.count);
  const [badge, setBadge] = useState({});
  const { user, loading } = useAuth();
  const dispatch = useDispatch();
  function handleAddAction(totalCount, dhikrId) {
    dispatch({ type: "increment", totalAmount: totalCount });
    if (count + 1 == totalCount) {
      const current = badge[dhikrId] ?? 0;
      const updated = current + 1;
      setBadge((prev) => ({ ...prev, [dhikrId]: updated }));
      handleBadge(dhikrId, updated);
    }
  }

  useEffect(() => {
    if (!user || loading) return;

    async function fetchAllBadges() {
      const q = query(collection(db, "badge"), where("userId", "==", user.uid));
      try {
        const querySnapshot = await getDocs(q);
        const badgeMap = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          badgeMap[data.id] = data.badge ?? 0;
        });
        setBadge(badgeMap);
      } catch (error) {
        console.error("Failed to fetch badges:", error);
      }
    }

    fetchAllBadges();
  }, [user, loading]);

  async function handleBadge(id, badge) {
    if (!user || loading) return;
    const badgeRef = doc(db, "badge", `${user.uid}_${id}`);
    await setDoc(badgeRef, {
      id,
      badge: badge ?? 0,
      userId: user.uid,
    });
  }
  let cssClasses = "border-b-4 border-b-amber-500 rounded-md";
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
                      Transliteration
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
                  </div>
                  <hr className="h-0.5 bg-black mt-[-2px]" />
                  <h3 className="mt-10 text-center text-sm">
                    {current === "pronounciation"
                      ? data.latin
                      : current === "arabic"
                      ? data.arabic
                      : current === "meaning"
                      ? data.translation
                      : null}
                  </h3>
                  <div className="flex justify-center items-center w-full h-80">
                    <div className="relative w-36 h-36">
                      {/* Outer ring */}
                      <div className="w-full h-full rounded-full bg-gray-200 relative">
                        {/* Progress arc */}
                        <div
                          className="absolute inset-0 rounded-full z-10"
                          style={{
                            background: `conic-gradient(#22c55e ${
                              (count / data.count) * 100 * 3.6
                            }deg, #e5e7eb 0deg)`,
                          }}
                        ></div>

                        {/* Inner white circle to make the ring effect */}
                        <div
                          className="absolute inset-[8%] bg-gray-50 rounded-full z-20 flex flex-col items-center justify-center cursor-pointer"
                          onClick={() => {
                            handleAddAction(data.count, data.id);
                          }}
                        >
                          <p className="text-3xl font-bold text-gray-800">
                            {count}
                          </p>
                          <p className="text-sm text-gray-500">/{data.count}</p>
                        </div>
                      </div>

                      {/* Red badge */}
                      <div className="absolute -top-3 -right-3 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-30 shadow-md">
                        {badge[data.id] ?? 0}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            )
          : null
      )}
    </section>
  );
}
