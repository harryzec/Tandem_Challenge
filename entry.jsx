import React from "react";
import ReactDOM from "react-dom";
import Trivia from './components/trivia'

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
	  <Trivia />,
	  document.getElementById('main')
  );
});
