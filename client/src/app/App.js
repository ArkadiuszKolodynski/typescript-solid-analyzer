import React from "react";
import Routes from "../routes/Routes";
import { StateProvider } from "../utils";
import "bootswatch/dist/yeti/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

const App = () => (
  <StateProvider>
    <Routes />
  </StateProvider>
);

export default App;
