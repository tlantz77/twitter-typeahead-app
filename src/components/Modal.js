import React from 'react';
import { getMentionByCursorPosition } from '../utilities';
import { getSearchResults } from '../api';

import Toolbar from './Toolbar';
import TypeaheadDropdown from './TypeaheadDropdown';
import '../styles.css';

const Modal = () => {
  const [text, setText] = React.useState('');
  const [debouncedText, setDebouncedText] = React.useState(text);
  const [cursorPosition, setCursorPosition] = React.useState(0);
  const [mentionToSearch, setMentionToSearch] = React.useState(null);
  const [selectedMention, setSelectedMention] = React.useState(null);
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
      if (mention && mention !== selectedMention) {
        setMentionToSearch(mention);
      } else {
        setMentionToSearch('');
      }
    }
  }, [debouncedText]);

  React.useEffect(() => {
    if (mentionToSearch) {
      getSearchResults(mentionToSearch).then(response => {
        setSearchResults(response);
      })
    } else {
      setSearchResults(null)
    }
  }, [mentionToSearch]);

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
  
  const textInput = () => {
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

  const selectMention = (screenName) => {
    setSelectedMention(screenName);
    const updatedText = text.replace(mentionToSearch, screenName);
    setText(updatedText);
    setMentionToSearch('');
  }

  const renderSearchResults = () => {
    return <TypeaheadDropdown searchResults={searchResults} onSelect={selectMention}/>
  }

  return ( 
    <div className='modal wrapper'>
      <form onSubmit={e => onFormSubmit(e)}>
        {textInput()}
        <Toolbar textLength={text.length}/>
      </form>
      {mentionToSearch && searchResults && renderSearchResults()}
    </div> 
  );
}

export default Modal;