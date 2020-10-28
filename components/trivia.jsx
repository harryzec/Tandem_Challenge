import React from "react";
import {PracticeTrivia, shuffle} from '../trivia.js'
import Card from './card'

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    let practiceTrivia = new PracticeTrivia();
    this.state = {i: 0, questions: practiceTrivia.questions}; 
    this.switchQuestion = this.switchQuestion.bind(this);
  }
  
  switchQuestion(e){
    e.preventDefault();
    this.setState({i: this.state.i+1});
  }

  render() {
  
    let card = this.state.questions[this.state.i];
    let question = card.question;
    let answer = card.correct;
    let incorrect = card.incorrect

    let options = incorrect.concat(answer)

    shuffle(options)
     
    options = options.map(option => {
      return (
       <div>
         {option}
       </div>
      )
    })


    return(
      <div>
        <Card question={question} answer={answer} options={options}/>
        <button onClick={this.switchQuestion}>Wanna get high??</button>
      </div>
    )
  }
}

export default Trivia;


// render the card.. transition the card so thatit slides up the screen flips then slides up again
// so here i just put in one question at a time 
// when it renders a different card iut thrwos that shit up

// on click is switches this shit uppp..