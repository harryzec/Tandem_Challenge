import React from 'react';

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: true, result: null};
    this.flip = this.flip.bind(this);
    this.switchQuestion = this.switchQuestion.bind(this);
  }

  flip(e) {
    e.preventDefault();
    this.setState({show: !this.state.show})
  }

  submit(e, value) {
    e.preventDefault();

    if (!this.props.practice.deck.currentCard.answered) this.props.practice.updateScore(value);

    this.setState({show: !this.state.show})
  }


  switchQuestion(e) {
    e.preventDefault()
    this.props.practice.nextQuestion(this.state.result)
    this.setState({result: null, show: !this.state.show})
  }

  render() {
    let card = this.props.practice.deck.currentCard;
    let thecard = this.state.show ? 'thecard' : 'thecardclick';

    if (this.props.practice.completed) {
      return(
        <div>
          hahahahahahaha looooserr this is your score
          {this.props.practice.score}
        </div>
      )
    }

    let question = card.question;
    let correct = card.correct;
    let options = card.options.map(option => {
      return (
          <p className='choice' onClick={(e)=>this.submit(e, option)}>{option}</p>
      )
    })

     return(
      <div>
        <p>{this.props.practice.score}</p>

        <div className='maincardcontainer'>

        <div className={thecard}>

        <div className='thefront'>
          <div className='cardContent'>
            <h2 className='cardQuestion'>{question}</h2>
            {options}
            
          </div>
        </div>

        <div className='theback'>
          <div className='cardContent'>
            <p>{correct}</p>
            <button onClick={this.switchQuestion}>Next Bitch</button>
            <button onClick={this.flip}>Flip</button>
          </div>
          
        </div>

        </div>

        </div>
      </div>
     )
  }
}

export default Trivia;