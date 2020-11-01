import React from 'react'
import Trivia from './trivia'
import {PracticeTrivia} from '../trivia'

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {practice: null, instructions: false}
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.showInstructions = this.showInstructions.bind(this);
  }

  showInstructions(e) {
    e.preventDefault();
    let instruct = "Welcome to QuickTriv! Are you looking to improve your trivia or are you just bored at work? Well you've come to the right place. We have a set of flashcards so you can get in a game of Trivia. The questions are formatted with multiple choice answers. Try our Speed Round for timed questions. Good luck!"
    for (let i = 0; i < instruct.length; i++) {
      let char =  instruct[i];
      setTimeout(() => {
        let currSent = this.state.instructions + char;
        if (i === 0) currSent = char;
        this.setState({instructions: currSent})
      }, 30*i)
    }
  }

  startGame(e, speed = false) {
    console.log(speed)
    e.preventDefault();
    let trivia = new PracticeTrivia();
    this.setState({practice: trivia, instructions: false, speed: speed})
  }

  endGame(e) {
    e.preventDefault();
    this.setState({practice: null});
  }
  
  render() {
    let practice;
    let startButton;
    let speedButton;
    let instructions;
    let instructButton;
    let quit;

    let network = (
      <div className='networkIcons'>
        <a className='LinkedIn' href='https://www.linkedin.com/in/harry-zec-7157a4a8/'></a>
        <a href='https://github.com/harryzec' className='Github'></a>
        <a className='portfolio' href='https://harryzec.github.io'></a>
      </div>
    )

    if (this.state.instructions) {
      instructions = (
        <div className='instructions'>
        {this.state.instructions}
        </div>
      )
      network = null;
    }

    if (this.state.practice !== null) {
      practice = <Trivia practice={this.state.practice} endGame={this.endGame} speed={this.state.speed}/>
      quit = <div className='splashButton' onClick={this.endGame}>Quit Game</div>
      network = null;
    }
    else {
      startButton = <div className='splashButton' onClick={(e) => this.startGame(e, false)}>Practice!</div>
      speedButton = <div className='splashButton' onClick={(e) => this.startGame(e, true)}>Speed Round</div>
      instructButton = <div onClick={this.showInstructions} className='splashButton'>Instructions</div>
    }

    return(
      <div className='splashPage'>
        <h1 className='gameTitle'>QuickTriv</h1>
        <div className='splashContent'>
          <div className='splashButtons'>
            {startButton}
            {speedButton}
            {instructButton}
            {quit}
          </div>
          <div className='content'>
            {practice}
            {instructions}
            {network}
          </div>
        </div>
      </div>
    )
  }
}

export default Splash