import { Outlet } from "react-router-dom";
import "./styles/Home.css"
import "./styles/About.css"
import "./styles/Login.css"
import "./styles/Signup.css"
import "./styles/ErrorPage.css"
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
