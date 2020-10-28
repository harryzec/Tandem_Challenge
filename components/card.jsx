import React from 'react';
import {shuffle} from '../trivia'

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: true};
    this.flip = this.flip.bind(this);
  }

  flip(e) {
    e.preventDefault();
    this.setState({show: !this.state.show})
  }

  render() {
     let thecard = this.state.show ? 'thecard' : 'thecardclick';
     console.log(thecard)
     

     return(
      <div className='maincardcontainer'>

      <div className={thecard} onClick={this.flip}>

      <div className='thefront'>
        {this.props.question}
        {this.props.options}

      </div>

      <div className='theback'>
        {this.props.answer}
      </div>

      </div>

      </div>
     )
  }
}

export default Card;