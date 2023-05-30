import { Outlet } from "react-router-dom";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import React from 'react';
import Typewriter from 'typewriter-effect';

const App = () =>{
return (
	<div className="App">
  <Navbar />
  <Outlet />
  <div className="MainText">
	<Typewriter
	  onInit={(typewriter)=> {
	  typewriter.typeString("Still Confused with College Choice?")
	  .pauseFor(10)
	  .start();
	}}
	/>
  </div>
	</div>
);
}

export default App;
