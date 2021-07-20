import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // the provider that supplies the app
import store from "./store";
import "./bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// note to me. Redux follows the load only once flow, that is why we have the concept of a store and a state manager
// action -> reducer -> store -> ui -> action ....
// the action triggers the reducer and the reducer the store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
