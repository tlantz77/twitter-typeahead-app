import React from 'react';
import { getMentionByCursorPosition } from '../utilities';

import TypeaheadDropdown from './TypeaheadDropdown';
import '../styles.css';

const tempResults = [
  {
    id: 1, name: 'HomerSimpson', screen_name: 'Homey', verified: true
  },
  {
    id: 2, name: 'BartSimpson', screen_name: 'ElBarto', verified: false
  },
  {
    id: 3, name: 'BarneyGumble', screen_name: 'BGDawg', verified: true
  }
]

const Modal = () => {
  const [text, setText] = React.useState('');
  const [debouncedText, setDebouncedText] = React.useState(text);
  const [cursorPosition, setCursorPosition] = React.useState(0);
  const [activeMention, setActiveMention] = React.useState('');
  const [searchResults, setSearchResults] = React.useState(null);

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

  React.useEffect(() => {
    if (activeMention) {
      setSearchResults(tempResults)
    } else {
      setSearchResults(null)
    }
  }, [activeMention]);

  const onFormSubmit = (event) => {
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

  const renderSearchResults = () => {
    return <TypeaheadDropdown searchResults={searchResults}/>
  }

  return ( 
    <div className='modal wrapper'>
      <form onSubmit={e => onFormSubmit(e)}>
        {textInput()}
        <div className='modal toolbar'>
          <button className='util submit-button'>Tweet</button>
        </div>
      </form>
      {activeMention && searchResults && renderSearchResults()}
    </div> 
  );
}

export default Modal;