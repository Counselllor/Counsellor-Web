import { Outlet } from "react-router-dom";
import "./styles/App.css";
import {Navbar} from "./components/index";
import React, { useState, useEffect } from "react";

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
        <div className="App">
          <Outlet />
        </div>
  );
};



export default App;



