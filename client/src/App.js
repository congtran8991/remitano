import React, { Suspense } from "react";
import Navigation from "./Navigation";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
          <Navigation />
      </Suspense>
    </div>
  );
}

export default App;
