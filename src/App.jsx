import { Outlet } from "react-router-dom";
import "./styles/App.css";
import {Navbar} from "./components/index";
import React, { useState, useEffect } from "react";

import HashLoader from "react-spinners/HashLoader";
const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
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
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default App;
