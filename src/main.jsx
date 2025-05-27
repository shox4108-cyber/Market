import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./scss/main.scss";
import { Provider } from "react-redux";
import { store } from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
