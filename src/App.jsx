import { Outlet } from "react-router-dom";
import "./styles/App.css";
import {Navbar} from "./components/index";
import React, { useState, useEffect } from "react";
import ScrollButton from "./components/Home/BackToTop";


const App = () => {

  return (
    <div>
      {loading ? (
        <div className="loader ">
          <HashLoader
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
            color={"#0603a9"}
          />
        </div>
      ) : (
        <div className="App">
          <Navbar />
          <Outlet />
          <ScrollButton />
        </div>
      )}

    </div>
  );
};



export default App;



