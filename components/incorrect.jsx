import React from 'react'

class Incorrect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {i: 0, start: true};
    this.next = this.next.bind(this);
  }

  next(e) {
    e.preventDefault();
    let i = this.state.i + 1;
    this.setState({i: i})
  }

  render() {

    let card = this.props.practice.deck.wrong[this.state.i]
    let question = card.question;
    let correct = card.correct;
    let options = card.options.map(option => {
    if (option === correct) return <p className='choice' onClick={(e)=>this.submit(e, option)}>{option}</p> // give it a green background
    else return <p className='choice' onClick={(e)=>this.submit(e, option)}>{option}</p>
    })

    let info = (
      <div className='titleCard'>QuickTriv</div>
    )

    if (this.state.start) {
      setTimeout(()=> this.setState({start: false}), 2300);
    } else  {
      info = (
        <div className='cardContent'>
          <h2 className='cardQuestion'>{question}</h2>
          {options}
          <div className='toggleCard'></div>
          <div onClick={this.next}>Next</div>
        </div>
      ) 
    }

    return(
      <div className='maincardcontainer'>

      <div className='thecard'>

      <div className='thefront'>
        {info}
      </div>

      </div>

      </div>
    )
  }
}

export default Incorrect;