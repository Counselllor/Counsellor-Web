import { Outlet } from "react-router-dom";
import "./styles/App.css";
import { Navbar } from "./components/index";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
