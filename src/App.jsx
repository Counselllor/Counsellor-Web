import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import "./styles/App.css";

import Dashboard from './components/Dashboard/Dashboard';
import CollegePage from './components/CollegePage/CollegePage';
import { createContext, useState } from 'react';

//theme context
export const ThemeContext = createContext(null);
const App = () => {

  const [theme, setTheme] = useState("light");

  //Toggle theme
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
    <div className="App" id={theme}>
      <Outlet />
    </div>
    </ThemeContext.Provider>
  );
};



export default App;



