import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user || null);
        setLoading(false);
    })

       return () => unsubscribe();
  }, [])


  return(
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
