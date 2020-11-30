import React from 'react';

const TypeaheadDropdown = ({searchResults, onSelect}) => {
  const renderedUsers = searchResults.map(user => {
    return (
      <li 
        key={user.id} 
        className={'user-row'}
        onClick={() => onSelect(user.screenName)}
        tabIndex='-1'
      >
        <img className='user-icon'></img>
        <div className='user-info'>
          <div className='user-name'>{user.name}{user.verified && ' *'}</div>
          <div className='user-screen-name'>{user.screenName}</div>
        </div>
      </li>
    ) 
  });

  return (
    <div className='dropdown-wrapper' >
      <ul tabIndex='0'>
        { searchResults.length >= 1 ? renderedUsers : 'No users found!'}
      </ul>
    
    </div>
  )
}

export default TypeaheadDropdown;