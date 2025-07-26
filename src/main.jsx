import { createRoot } from "react-dom/client";
import "./scss/main.scss";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
);
