import React, { useEffect, useState } from 'react';
import verifiedIcon from '../assets/Twitter_Verified_Badge.png';

//hook to track key presses and add event listeners for keyboard navigation
const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });

  return keyPressed;
};

//render element for a single Twitter user search response with
//props for selection and keyboard navigation
const renderItemRow = (item, active, setHovered, onSelect) => {
  return (
    <div 
      key={item.id}
      className={`item-row ${active ? 'active': ''}`}
      onClick={() => onSelect(item.screenName)}
      onMouseEnter={() => setHovered(item)}
      onMouseLeave={() => setHovered(undefined)}
    >
      <img className='item-icon' src={item.profileImageUrl} alt='item portrait'/>
        <div className='item-name'>
          {item.name}   {item.verified && <img src={verifiedIcon} alt='bluecheck' className='verified'/>}
        </div>
      <div className='item-screen-name'>{item.screenName}</div>
    </div>
  )
}

//Hook to render list of search results with effects to handle keyboard navigation
//Tracks highlighted or selected results by items array index
const TypeaheadDropdown = ({items, onSelect}) => {
  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const enterPress = useKeyPress('Enter');
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);

  useEffect(() => {
    if (downPress) {
      setCursor(prevState =>
        prevState < items.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress]);

  useEffect(() => {
    if (upPress) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);

  useEffect(() => {
    if (enterPress) {
      onSelect(items[cursor].screenName);
    }
  }, [cursor, enterPress]);

  useEffect(() => {
    if (hovered) {
      setCursor(items.indexOf(hovered));
    }
  }, [hovered]);

  const renderedItems = items.map((item, i) => {
    let active = i === cursor;
    return renderItemRow(item, active, setHovered, onSelect);
  });

  return (
    <div className='dropdown-wrapper'>
      {renderedItems}
    </div>
  )
}

export default TypeaheadDropdown;