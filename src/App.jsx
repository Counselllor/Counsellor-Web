import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./styles/App.css";

import Dashboard from "./components/Dashboard/Dashboard";
import CollegePage from "./components/CollegePage/CollegePage";
import { createContext, useState, useEffect } from "react";
import { ProviderStore } from "./redux/StoreProvider";
import ChatBot from "./components/chatbot/Chatbot";

// Theme context
export const ThemeContext = createContext(null);

// App
const App = () => {
  // Get initial theme from localStorage or default to 'light'
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Get the current location
  const location = useLocation();

  // Determine if the current route is the login page
  const isLoginPage = location.pathname === "/";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Redux store provider */}
      <ProviderStore>
        <div className="App" id={theme}>
          <Outlet />
          {/* Conditionally render the ChatBot component */}
          {!isLoginPage && <ChatBot />}
        </div>
      </ProviderStore>
    </ThemeContext.Provider>
  );
};

export default App;
