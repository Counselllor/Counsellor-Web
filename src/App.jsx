import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import "./styles/App.css";

import Dashboard from './components/Dashboard/Dashboard';
import CollegePage from './components/CollegePage/CollegePage';
const App = () => {

  return (
    <div className="App">
      <Outlet Dashboard />
    </div>
  );
};



export default App;



