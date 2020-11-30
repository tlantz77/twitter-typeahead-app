import React from 'react';

const Suggestions = ({searchResults, onSelect}) => {
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
    <div className='dropdown-wrapper'>
       { renderedUsers }
    </div>
  )
}

export default Suggestions;