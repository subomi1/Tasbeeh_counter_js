import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FetchContextProvider } from "./store/FetchContext.jsx";
import { Provider } from "react-redux";
import store from "./store/Redux.js";
import { AuthProvider } from "./store/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FetchContextProvider>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </FetchContextProvider>
  </StrictMode>
);
