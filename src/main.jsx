import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes/Routes";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster position="top-right" richColors />
    <RouterProvider router={router} />
  </Provider>
);
