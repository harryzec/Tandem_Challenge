import React from "react";
import ReactDOM from "react-dom";
import Trivia from './components/trivia'
import {PracticeTrivia} from './trivia'

function Root() {
  let newGame = new PracticeTrivia();
  return(
      <Trivia practice={newGame}/>
  )
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
	  <Root />,
	  document.getElementById('main')
  );
});
