import { RouterProvider } from "react-router-dom";

import { routers } from "./Routes";

const Navigation = () => <RouterProvider router={routers} />;

export default Navigation;