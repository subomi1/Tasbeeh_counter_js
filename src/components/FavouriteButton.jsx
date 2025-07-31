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
import { toast } from 'react-hot-toast';

export default function FavouriteButton({ id, title, fawaid, notes, catName, onRemove }) {
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
        toast.success("Dhikir removed from your favourites");
        if (onRemove) onRemove()
      } else {
         const newItems = {
          userid: user.uid,
          id,
          title,
          fawaid,
          notes,
          catName,
          timestamp: serverTimestamp(),
        };
        await setDoc(favRef, newItems)
        setIsFavourite(true);
        toast.success("Dhikir added to your favourites")
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
