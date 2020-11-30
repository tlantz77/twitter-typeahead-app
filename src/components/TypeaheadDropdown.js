import React from 'react';

const Suggestions = ({searchResults}) => {
  const renderedUsers = searchResults.map(user => {
    return (
      <div key={user.id} className={'user-row'}>
        <img className='user-icon'></img>
        <div className='user-info'>
          <div className='user-name'>{user.name}{user.verified && ' *'}</div>
          <div className='user-screen-name'>{`@${user.screen_name}`}</div>
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