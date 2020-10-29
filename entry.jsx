import React from "react";
import ReactDOM from "react-dom";
import Splash from './components/splash'

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
	  <Splash/>,
	  document.getElementById('main')
  );
});
