import React, { Suspense } from "react";
import Header from "./Component/Header";
import Navigation from "./Navigation";
import "./App.css"
//import { useSelector, useDispatch } from "react-redux";
// import { updateTheme, themeValue } from "./Redux/reducer/themeSlice";

function App() {
  // const dispatch = useDispatch();
  // const theme = useSelector(themeValue);
  // const stableDispatch = useCallback(dispatch, [dispatch]);

  return (
    <div className="app">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Navigation />
      </Suspense>
      {/* Footer */}
    </div>
  );
}

export default App;
