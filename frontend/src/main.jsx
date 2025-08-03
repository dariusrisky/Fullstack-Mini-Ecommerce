import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Link,
} from "react-router-dom";
import DefaultPage from "./page/defaultPage.jsx";
import App from "./App.jsx";
import ProductPage from "./page/ProductPage.jsx";
import "./index.css";
import ProfilePage from "./page/ProfilePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<DefaultPage />} />
      <Route path="/buy/product/:productid" element={<ProductPage />} />
      <Route path="/user/profile" element={<ProfilePage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
