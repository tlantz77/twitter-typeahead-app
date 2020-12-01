import React from 'react';

//Toolbar with submit button and text counter
const Toolbar = ({textLength}) => {
  let charactersRemaining = 280 - textLength; 
  let counterColor = charactersRemaining <= 0 ? 'red' : 'white';
  return ( 
    <div className='toolbar'>
      <div className='util-wrapper'>
        <span 
          className='text-counter' 
          style={{color: counterColor}}
        >
          {charactersRemaining}
        </span>
        <button className='submit-button'>Tweet</button>
      </div>
    </div>
   );
}
 
export default Toolbar;