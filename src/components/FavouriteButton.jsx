import { Heart } from "lucide-react";
import { useAuth } from "../store/AuthContext";
import { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function FavouriteButton({ id, title, fawaid, notes, catName }) {
  const { user, loading } = useAuth();
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (user) {
      const favRef = doc(db, "favourite", `${user.uid}_${id}`);
      getDoc(favRef).then((docSnap) => {
        setIsFavourite(docSnap.exists());
      });
    }
  }, [user, id]);

  async function handleAddFavourites() {
    if (!user) return alert("Please log in first");
    const favRef = doc(db, "favourite", `${user.uid}_${id}`);
    try {
      if (isFavourite) {
        await deleteDoc(favRef);
        setIsFavourite(false);
      } else {
        await setDoc(favRef, {
          userid: user.uid,
          id,
          title,
          fawaid,
          notes,
          catName,
          timestamp: serverTimestamp(),
        });
        setIsFavourite(true);
      }
    } catch (error) {
      console.error("Error updating favourites:", error);
    }
  }
  return (
    <button onClick={handleAddFavourites}>
      {isFavourite ? (
        <Heart
          color="#fa0000"
          strokeWidth={1.75}
          className="mt-auto mr-auto cursor-pointer fill-[#fa0000]"
        />
      ) : (
        <Heart
          color="#fa0000"
          strokeWidth={1.75}
          className="mt-auto mr-auto cursor-pointer"
        />
      )}
    </button>
  );
}
