import React from 'react';
import { getMentionByCursorPosition } from '../utilities';
import '../styles.css';

const Modal = () => {
  const [text, setText] = React.useState('');
  const [debouncedText, setDebouncedText] = React.useState(text);
  const [cursorPosition, setCursorPosition] = React.useState(0);
  const [activeMention, setActiveMention] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  React.useEffect(() => {
    if (debouncedText) {
      const mention = getMentionByCursorPosition(debouncedText, cursorPosition);
      if (mention) {
        setActiveMention(mention);
      } else {
        setActiveMention('');
      }
    }
  }, [debouncedText]);

  const onFormSubmit = event => {
    event.preventDefault();
    console.log('You tweeted: ' + text);
    setText('');
    setActiveMention('');
  }
  
  const textInput = () => {
    return (
      <textarea
        className='modal text-input'
        maxLength='280'
        rows='8'
        cols='80'
        placeholder="What's happening?"
        value={text}
        onChange={e => {
          setText(e.target.value)
          setCursorPosition(e.target.selectionStart)
        }}
      />
    )
  }

  const searchResultsWrapper = () => {
    return (
      <div className='search-results-wrapper'>
        Search results to go here!
      </div>
    )
  }

  return ( 
    <div className='modal wrapper'>
      <form onSubmit={e => onFormSubmit(e)}>
        {textInput()}
        <div className='modal toolbar'>
          <button className='util submit-button'>Tweet</button>
        </div>
      </form>
      {activeMention && searchResultsWrapper()}
    </div> 
  );
}

export default Modal;