import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Page/HomePage";
const SharePage = lazy(() => import("../Page/Share"));

const routes = [
  {
    path: "/",
    exact: false,
    element: <HomePage />,
  },
  {
    path: "/share",
    exact: false,
    element: <SharePage />,
  },
  {
    path: "*",
    element: <div>Not found</div>,
  },
];

export const routers = createBrowserRouter(routes);
