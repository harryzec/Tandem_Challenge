import React from "react";
import Questions from '../trivia.js'

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    //let questions = new Game.Questions();
    //this.state = {i: 0, questions: questions}; 
    //this.switchQuestion = this.switchQuestion.bind(this);
    
  }
  
  switchQuestion(e){
   e.prevenDefault();
   let j = i+1;
   this.setState({i: j});
  }

  render() {
    return(
      <div>lol
      </div>
    )

    /*let card = this.state.questions[this.state.i].map(card => {
      let q = card[question];
      let a = card[correct];
      let i = card[incorrect];

      return (
        <div>
          <p>{q}</p>
          <p>{a}</p>
          <p>{i}</p>
        </div>
      )
    })
    */

    return(
      <div>
      <h1>pussy</h1>
      </div>
    )
  }
}

export default Trivia;


// render the card.. transition the card so thatit slides up the screen flips then slides up again
// so here i just put in one question at a time 
// when it renders a different card iut thrwos that shit up

// on click is switches this shit uppp..