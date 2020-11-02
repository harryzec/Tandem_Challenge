import React from 'react';
import Incorrect from './incorrect'

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: true, result: null, start: true, incorrect: false, time: 5, countdown: true, judgementWord: ''};
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
      this.props.practice.updateScore(value);
      this.setState({show: !this.state.show, judgementWord: this.props.practice.deck.currentCard.judgement});
      let q = this.props.practice.deck.currentCard.question;
      setTimeout(() => {
        if (!this.props.practice.deck.currentCard.answered || q === this.props.practice.deck.currentCard.question) this.setState({judgementWord: ''})}, 2000)
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

    if (this.state.incorrect) {
      return (
        <Incorrect practice={this.props.practice} endGame={this.props.endGame}/>
      )
    }

    if (this.props.speed && this.state.countdown && !this.state.start) {
      this.beginCount()
      this.setState({countdown: false});
    }

    
    if (this.state.time === 0) {
      if (!this.props.practice.deck.currentCard.answered) {
        this.props.practice.updateScore(null);
        this.setState({show: !this.state.show, judgementWord: this.props.practice.deck.currentCard.judgement});
        let q = this.props.practice.deck.currentCard.question;

        setTimeout(() => {
          if (!this.props.practice.deck.currentCard.answered || q === this.props.practice.deck.currentCard.question) this.setState({judgementWord: ''})}, 2000)
      }
    }

    if (this.props.practice.completed) {
      let viewWrong;
      if (this.props.practice.deck.wrong.length) viewWrong = <div className='backButtons' onClick={()=> this.setState({incorrect: true})}>View the cards you got wrong</div>

      return(
        <div className='finishedGame'>
          <p className='scoreInfo'>Your Score: {this.props.practice.score}</p>
          <p className='scoreInfo'>{this.props.practice.range}</p>
          <div className='backButtons' onClick={this.props.endGame}>Exit</div>
          {viewWrong}
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
      let timer;

      if (this.props.speed) timer = <h3 className='timer'>Timer: {this.state.time}</h3>

      score = (
        <div className='score'>
          {timer}
          <h3 className='scoreWord'>Score:</h3>
          <p className='scoreNumber'>{this.props.practice.score}</p>
        </div>
      )
    }

    let nextQ = 'Next Question'
    if (this.props.practice.deck.index === 9) nextQ = 'See Results!'

    let res = this.state.judgementWord === '' ? 'empty' : 'goodorbad';
    let word = this.state.judgementWord === '' ? 'empty' : this.state.judgementWord;

     return(
      <div className='gameContent'>
        <p className={res}>{word}</p>

        <div className='cardandscore'>
          <div className={cardClass}>

          <div className={thecard}>

          <div className='thefront'>
            {info}
          </div>

          <div className='theback'>
            <div className='cardContent'>
              <p>{correct}</p>
              <div className='backButtons' onClick={this.switchQuestion}>{nextQ}</div>
              <div className='backButtons' onClick={this.flip}>See Front</div>
            </div>
            
          </div>

          </div>

          </div>

          {score}
          
        </div>
      </div>
     )
  }
}

export default Trivia;