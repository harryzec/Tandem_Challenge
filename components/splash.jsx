import React from 'react'
import Trivia from './trivia'
import {PracticeTrivia} from '../trivia'

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {practice: null}
    this.startGame = this.startGame.bind(this);
  }

  startGame(e) {
    e.preventDefault();
    let trivia = new PracticeTrivia();
    this.setState({practice: trivia})
  }

  
  render() {
    let practice;
    let startButton;

    if (this.state.practice !== null) practice = <Trivia practice={this.state.practice}/>
    else startButton = <button onClick={this.startGame}>Play Ball!</button>

    if (this.state.practice !== null) {
      if (this.state.practice.completed) {
        return(
          <div>
            You did SHITTY
            {this.state.practice.score}
          </div>
        )
      }
    }

    return(
      <div>
        {startButton}
        {practice}
      </div>
      
    )
  }
}

export default Splash