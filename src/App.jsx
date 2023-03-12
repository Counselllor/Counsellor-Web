import { Outlet } from "react-router-dom";
import "./styles/App.css";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
