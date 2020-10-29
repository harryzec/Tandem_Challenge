import React from 'react'
import Trivia from './trivia'
import {PracticeTrivia} from '../trivia'

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {practice: null}
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  startGame(e) {
    e.preventDefault();
    let trivia = new PracticeTrivia();
    this.setState({practice: trivia})
  }

  endGame(e) {
    e.preventDefault();
    this.setState({practice: null});
  }
  
  render() {
    let practice;
    let startButton;

    if (this.state.practice !== null) practice = <Trivia practice={this.state.practice} endGame={this.endGame}/>
    else startButton = <button onClick={this.startGame}>Play Ball!</button>

    return(
      <div>
        <h1 className='gameTitle'>QuickTriv</h1>
        {startButton}
        {practice}
      </div>
    )
  }
}

export default Splash