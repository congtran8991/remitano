import React from "react";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { BrowserRouter } from "react-router-dom";

const providerMock = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{props.children}</BrowserRouter>
    </Provider>
  );
};

export default providerMock;
