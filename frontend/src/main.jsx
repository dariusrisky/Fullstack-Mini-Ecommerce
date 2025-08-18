import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Link,
} from "react-router-dom";
import DefaultPage from "./page/DefaultPage.jsx";
import App from "./App.jsx";
import ProductPage from "./page/ProductPage.jsx";
import "./index.css";
import ProfilePage from "./page/ProfilePage.jsx";
import TokoPage from "./page/TokoPage.jsx";
import ResultSearchPage from "./page/ResultSearchPage.jsx";
import TokoAdminPage from "./page/TokoAdminPage.jsx";
import ErrorPage from "./page/errorPage.jsx";
import Dashboard from "./components/dashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<DefaultPage />} />
      <Route path="/buy/product/:productid" element={<ProductPage />} />
      <Route path="/user/profile" element={<ProfilePage />} />
      <Route path="/toko/:id" element={<TokoPage />} />
      <Route path="/search" element={<ResultSearchPage />} />
      <Route path="/dashboard/:id" element={<TokoAdminPage />}>
        <Route path="" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
