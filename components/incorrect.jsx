import React from 'react'

class Incorrect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {i: 0, start: true, len: this.props.practice.deck.wrong.length};
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  next(e) {
    e.preventDefault();
    let i = this.state.i + 1;
    this.setState({i: i})
  }

  prev(e) {
    e.preventDefault();
    let i = this.state.i-1;
    console.log(i)
    this.setState({i: i})
  }



  render() {

    let card = this.props.practice.deck.wrong[this.state.i]
    let question = card.question;
    let correct = card.correct;
    let options = card.options.map(option => {
    if (option === correct) return <p className='choiceG'>{option}</p> // give it a green background
    if (option === card.choice) return <p className='choiceB'>{option}</p>
    else return <p className='choiceN'>{option}</p>
    })

    let info = (
      <div className='titleCard'>QuickTriv</div>
    )

    if (this.state.start) {
      setTimeout(()=> this.setState({start: false}), 2300);
    } else  {

      let next = <div onClick={this.next}>Next</div>
      let prev = <div onClick={this.prev}>Prev</div>
      if (this.state.i === 0) prev = <div>Prev</div>
      if (this.state.i === this.state.len-1) next = <div onClick={this.props.endGame}>Exit</div>

      info = (
        <div className='cardContent'>
          <h2 className='cardQuestion'>{question}</h2>
          {options}
          <div className='toggleCard'>
            {prev}
            {next}
          </div>
          
        </div>
      ) 
    }

    return(
      <div className='cardandscore'>
      <div className='maincardcontainer'>

      <div className='thecard'>

      <div className='thefront'>
        {info}
      </div>
      </div>

      </div>

      </div>
    )
  }
}

export default Incorrect;