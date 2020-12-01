import React from 'react';
import verifiedIcon from '../assets/Twitter_Verified_Badge.png';

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = React.useState(false);

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

  React.useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });

  return keyPressed;
};

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

const TypeaheadDropdown = ({items, onSelect}) => {
  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const enterPress = useKeyPress('Enter');
  const [cursor, setCursor] = React.useState(0);
  const [hovered, setHovered] = React.useState(undefined);

  React.useEffect(() => {
    if (items.length && downPress) {
      setCursor(prevState =>
        prevState < items.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress]);

  React.useEffect(() => {
    if (items.length && upPress) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);

  React.useEffect(() => {
    if (items.length && enterPress) {
      onSelect(items[cursor].screenName);
    }
  }, [cursor, enterPress]);

  React.useEffect(() => {
    if (items.length && hovered) {
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