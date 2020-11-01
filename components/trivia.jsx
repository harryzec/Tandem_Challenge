import React from 'react';
import Incorrect from './incorrect'

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: true, result: null, start: true, displayScore: false, showGood: false, showBad: false, incorrect: false, time: 5, countdown: true};
    this.flip = this.flip.bind(this);
    this.switchQuestion = this.switchQuestion.bind(this);
    this.beginCount = this.beginCount.bind(this);
  }

  beginCount() {
    for (let i = 1; i < 6; i++) {
      let num = i*1000;
      let question = this.props.practice.deck.currentCard.question;
      setTimeout(()=> {
        if (question === this.props.practice.deck.currentCard.question && !this.props.practice.deck.currentCard.answered)this.setState({time: this.state.time-1})
      }, num)
    }
  }

  flip(e) {
    e.preventDefault();
    this.setState({show: !this.state.show})
  }

  submit(e, value) {
    e.preventDefault();

    if (!this.props.practice.deck.currentCard.answered) {
      if (this.props.practice.updateScore(value)) {
        this.setState({showGood: true, show: !this.state.show})
        setTimeout(() => this.setState({showGood: false}), 2000)
      } else {
        this.setState({showBad: true, show: !this.state.show})
        setTimeout(() => this.setState({showBad: false}), 2000)
      }
    } else {
      this.setState({show: !this.state.show})
    }

  }


  switchQuestion(e) {
    e.preventDefault()
    this.props.practice.nextQuestion(this.state.result)
    if (this.props.speed) this.setState({result: null, show: !this.state.show, time: 5, countdown: true})
    else this.setState({result: null, show: !this.state.show})
  }

  render() {
    let card = this.props.practice.deck.currentCard;
    let thecard = this.state.show ? 'thecard' : 'thecardclick';
    let cardClass = 'maincardcontainer'
    let showGood;
    let showBad;
    let timer;

    if (this.state.incorrect) {
      return (
        <Incorrect practice={this.props.practice} endGame={this.props.endGame}/>
      )
    }

    if (this.props.speed && this.state.countdown && !this.state.start) {
      this.beginCount()
      this.setState({countdown: false});
    }

    if (this.props.speed) {
      timer = <div>{this.state.time}</div>
    }

    if (this.state.time === 0) {
      if (!this.props.practice.deck.currentCard.answered) {
        this.props.practice.updateScore(null);
        this.setState({showBad: true, show: !this.state.show})
        setTimeout(() => this.setState({showBad: false}), 2000)
      }
    }

    if (this.state.showGood) {
      showGood = (<p>NICE!!</p>)
    }

    if (this.state.showBad) {
      showBad = (<p>Aw Man</p>)
    }

    if (this.state.displayScore) {


      return(
        <div>
          Your Score: {this.props.practice.score}
          {this.props.practice.range}
          <button onClick={this.props.endGame}>Exit</button>
          <button onClick={()=> this.setState({incorrect: true})}>View the cards you got wrong</button>
        </div>
      )
    }


    let question;
    let correct;
    let options;

    if (card !== undefined) {
      question = card.question;
      correct = card.correct;
      options = card.options.map(option => {
        return (
            <p className='choice' onClick={(e)=>this.submit(e, option)}>{option}</p>
        )
      })
    }

    

    let info = (
      <div className='titleCard'>QuickTriv</div>
    )

    let score;

    if (this.state.start) {
      setTimeout(()=> this.setState({start: false}), 2300);
    } else if (card !== undefined) {
      info = (
        <div className='cardContent'>
          <h2 className='cardQuestion'>{question}</h2>
          {options}
        </div>
      ) 

      score = (
        <div className='score'>
          <h3 className='scoreWord'>Score:</h3>
          <p className='scoreNumber'>{this.props.practice.score}</p>
        </div>
      )
    }

    if (this.props.practice.completed) {
      cardClass = 'mainCardOut';

      if (!this.state.displayScore) setTimeout(()=> this.setState({displayScore: true}), 1000)

      info = (
        <div className='titleCard'>QuickTriv</div>
      )
    }


     return(
      <div className='cardandscore'>
        {showGood}
        {showBad}
        {timer}

        <div className={cardClass}>

        <div className={thecard}>

        <div className='thefront'>
          {info}
        </div>

        <div className='theback'>
          <div className='cardContent'>
            <p>{correct}</p>
            <div className='backButtons' onClick={this.switchQuestion}>Next Question</div>
            <div className='backButtons' onClick={this.flip}>See Front</div>
          </div>
          
        </div>

        </div>

        </div>

        {score}
        
      </div>
     )
  }
}

export default Trivia;