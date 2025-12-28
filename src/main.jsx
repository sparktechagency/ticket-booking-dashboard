import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes/Routes";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <div>
    <Toaster position="top-right" richColors />
    <RouterProvider router={router} />
  </div>
);
