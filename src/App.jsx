import { Outlet } from "react-router-dom";
import "./styles/App.css";
import Footer from "./components/Footer/Footer";
const App = () => {

  return (
    <div className="App">
      <Outlet />
      {/* <Footer/> */}
    </div>
  );
};



export default App;



