import React from 'react';

const TypeaheadDropdown = ({searchResults, onSelect}) => {
  const renderedUsers = searchResults.map(user => {
    return (
      <div 
        key={user.id} 
        className={'user-row'}
        onClick={() => onSelect(user.screenName)}
      >
        <img className='user-icon'></img>
        <div className='user-info'>
          <div className='user-name'>{user.name}{user.verified && ' *'}</div>
          <div className='user-screen-name'>{user.screenName}</div>
        </div>
      </div>
    ) 
  });

  return (
    <div className='dropdown-wrapper' >
      { searchResults.length >= 1 ? renderedUsers : 'No users found!'}
    </div>
  )
}

export default TypeaheadDropdown;