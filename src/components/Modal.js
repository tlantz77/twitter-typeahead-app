import React, { Component } from 'react';
import { getCurrentWord, isValidMention } from '../utilities';
import '../styles.css';

class Modal extends Component {
  state = {
    tweetText: this.props.tweetText || '',
    activeMention: this.props.mentions || ''
  }

  componentDidUpdate() {
    // console.log('Text:' + this.state.tweetText);
    console.log('activeMention: ', this.state.activeMention);
  }

  onFormSubmit = event => {
    event.preventDefault();
    console.log('You tweeted: ' + this.state.tweetText);
    this.setState({
      tweetText: '',
      activeMention: ''
    });
  }

  onTextChange = event => {
    const textString = event.target.value;
    this.setState({ tweetText: textString });

    if (textString) {
      const currentWord = getCurrentWord(textString);
      if(isValidMention(currentWord)) {
        this.setState({ activeMention: currentWord })
      } else {
        this.setState({ activeMention: '' })
      }
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