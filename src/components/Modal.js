import React, { Component } from 'react';
import '../styles.css';

class Modal extends Component {
  state = { tweetText: '' };

  componentDidUpdate() {
    console.log(this.state.tweetText);
  }

  onFormSubmit = event => {
    event.preventDefault();
    console.log('You tweeted: ' + this.state.tweetText);
  }

  textInput() {
    return (
      <textarea
        className='modal text-input'
        maxLength='280'
        rows='8'
        cols='80'
        placeholder="What's happening?"
        value={this.state.tweetText}
        onChange={e => this.setState({ tweetText: e.target.value })}
      />
    )
  }
  
  render () {
    return ( 
      <div className='modal wrapper'>
        <form onSubmit={this.onFormSubmit}>
          {this.textInput()}
          <div className='modal toolbar'>
            <button className='util submit-button'>Tweet</button>
          </div>
        </form>
      </div> 
    );
  }
}
 
export default Modal;