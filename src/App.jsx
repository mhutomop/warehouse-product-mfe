import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";

import "./index.scss";

import Home from "./components/Home";
import AddProduct from "./components/AddProduct";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
