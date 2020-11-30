import React from 'react';
import { getMentionByCursorPosition } from '../utilities';
import { getSearchResults } from '../api';

import Toolbar from './Toolbar';
import TypeaheadDropdown from './TypeaheadDropdown';
import '../styles.css';

// const tempResults = [
//   {
//     id: 1, name: 'Homer Simpson', screenName: '@Homerpalooza', verified: true
//   },
//   {
//     id: 2, name: 'Bart Simpson', screenName: '@ElBarto', verified: false
//   },
//   {
//     id: 3, name: 'Herschel Krustofsky', screenName: '@KrustyTheClown', verified: true
//   }
// ]

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
      const mention = getMentionByCursorPosition(text, cursorPosition);
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
    console.log('You tweeted: ' + text);
    setText('');
    setMentionToSearch('');
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