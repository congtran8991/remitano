import React, { Suspense } from "react";
import Navigation from "./Navigation";
import "./App.css";
// import { useDispatch } from "react-redux";

function App() {
  // const theme = useSelector(dataUser);
  // const stableDispatch = useCallback(dispatch, [dispatch]);
  // useEffect(() => {
  //   const themeLocal = localStorage.getItem("theme-App") || "light";
  //   stableDispatch(userLogin(themeLocal));
  // }, [stableDispatch]);

  return (
    <div className="app">
      {/* <Header /> */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* <BrowserRouter> */}
          <Navigation />
        {/* </BrowserRouter> */}
      </Suspense>
    </div>
  );
}

export default App;
