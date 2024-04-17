import { Outlet } from "react-router-dom";
import "./styles/App.css";

const App = () => {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default App;
