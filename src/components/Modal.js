import React from 'react';
import { getSearchResults } from '../api';

import Toolbar from './Toolbar';
import TypeaheadDropdown from './TypeaheadDropdown';
import '../styles.css';

//Modal hook manages state and renders textarea
//renders and passes props to TypeaheadDropdown and Toolbar
const Modal = () => {
  const [text, setText] = React.useState('');
  const [debouncedText, setDebouncedText] = React.useState(text);
  const [cursorPosition, setCursorPosition] = React.useState(0);
  const [mentionToSearch, setMentionToSearch] = React.useState(null);
  const [selectedMention, setSelectedMention] = React.useState(null);
  const [searchResults, setSearchResults] = React.useState(null);

  //Debounce text input on a half second delay
  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  //Check for searchable mention in debounced text using cursor position
  //and regex pattern and set if found
  React.useEffect(() => {
    const getMentionByCursorPosition = (text, cursorPosition) => {
      const mentions = text.match(/@[A-z0-9]{2,}/g);
      if (mentions) {
        for (let i = 0; i < mentions.length; i++) {
          const mentionStartIndex = text.indexOf(mentions[i]);
          const mentionEndIndex = mentionStartIndex + mentions[i].length;
          if (cursorPosition > mentionStartIndex && cursorPosition <= mentionEndIndex) {
            return mentions[i];
          }
        }
      }
      return null;
    }

    if (debouncedText) {
      const mention = getMentionByCursorPosition(debouncedText, cursorPosition);
      if (mention && mention !== selectedMention) {
        setMentionToSearch(mention);
      } else {
        setMentionToSearch('');
      }
    }
  }, [debouncedText, cursorPosition]);

  //Performs api search when searchable mention is updated
  React.useEffect(() => {
    if (mentionToSearch) {
      getSearchResults(mentionToSearch).then(response => {
        setSearchResults(response);
      })
    } else {
      setSearchResults(null)
    }
  }, [mentionToSearch]);

  //Runs when Tweet button is clicked, will clear relevant pieces of state
  //and localStorage
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (text.length > 280) {
      alert('Error: You have exceeded the 280 character limit!');
    } else {
      alert('Congratulations, you tweeted something!  May the ratio be with you!');
      setText('');
      setMentionToSearch(null);
      setSearchResults(null);
      localStorage.clear();
    }
  }
  
  //Tweet textarea that keeps track of cursor position
  const renderTextInput = () => {
    return (
      <textarea
        className='modal text-input'
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

  //Function to select mention and updates text to slected mention screenname
  //Passed as prop to dropdown component
  const selectMention = (screenName) => {
    setSelectedMention(screenName);
    const updatedText = text.replace(mentionToSearch, screenName);
    setText(updatedText);
    setMentionToSearch('');
  }

  const renderSearchResults = () => {
    return <TypeaheadDropdown items={searchResults} onSelect={selectMention}/>
  }

  return ( 
    <div className='modal wrapper'>
      <form onSubmit={e => onFormSubmit(e)}>
        {renderTextInput()}
        <Toolbar textLength={text.length}/>
      </form>
      {mentionToSearch && searchResults && renderSearchResults()}
    </div> 
  );
}

export default Modal;