import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import WatchlistContext from "./context/WatchlistContext.jsx";
import { Provider } from "react-redux"; // ✅ Import Redux Provider
import { store } from "./components/store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <WatchlistContext>
            <App />
          </WatchlistContext>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
