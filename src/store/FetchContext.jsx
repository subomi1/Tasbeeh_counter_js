import { createContext, useState, useEffect } from "react";

export const FetchContext = createContext({
    data: []
});

export function FetchContextProvider({ children }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      const res = await fetch("/json/dhikir.json");
      const data = await res.json();
      setData(data);
    }
    fetchdata();
  }, []);

  console.log(data);

  return(
    <FetchContext.Provider value={{data}}>
        {children}
    </FetchContext.Provider>
  )
}

export default FetchContext;
