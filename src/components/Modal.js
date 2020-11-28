import React, { Component } from 'react';
import { getCurrentWord } from '../utilities';
import '../styles.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetText: this.props.tweetText,
      currentWord: this.props.currentWord
    }
  }

  componentDidUpdate() {
    console.log('Text:' + this.state.tweetText);
    console.log('Curent Word:' + this.state.currentWord);
  }

  onFormSubmit = event => {
    event.preventDefault();
    console.log('You tweeted: ' + this.state.tweetText);
    this.setState({tweetText: ''});
  }

  onTextChange = event => {
    const textString = event.target.value;
    if (textString) {
      this.setState({
        tweetText: textString,
        currentWord: getCurrentWord(textString) 
      });
    }
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
        onChange={e => {this.onTextChange(e)}}
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