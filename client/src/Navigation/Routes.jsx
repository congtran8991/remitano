import { lazy } from "react";
import HomePage from "../Page/HomePage";
const SharePage = lazy(() => import("../Page/Share"));

export const routes = [
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

