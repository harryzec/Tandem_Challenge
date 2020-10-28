import React from 'react';
import * as Game from '../trivia.js'

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    let questions = new Game.Questions();
    this.state = {i: 0, questions: questions}; 
    this.switchQuestion = this.switchQuestion.bind(this);
  }
  
  switchQuestion(e){
    e.prevenDefault();
    let j = i+1;
    this.setState({i: j});
  }

  render() {
    let card = this.state.questions[this.state.i].map(card => {
      let q = card[question];
      let a = card[correct];
      let i = card[incorrect];

      return (
        <>
          <p>{q}</p>
          <p>{a}</p>
          <p>{i}</p>
        </>
      )
    })

    return(
      <>
      <h1>'pussy'</h1>
      <p>lol</p>
      {card}
      <button onClick={this.switchQuestion}></button>
      </>
    )
  }
}
// render the card.. transition the card so thatit slides up the screen flips then slides up again
// so here i just put in one question at a time 
// when it renders a different card iut thrwos that shit up

// on click is switches this shit uppp..

export default Trivia