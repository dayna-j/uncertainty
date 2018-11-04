import React from 'react'
// Option is a stateless, functional component.  It represents each option in the UI.
// Option is rendered by AddOption
const Option = (props) => (
  <div className='option'>
    <p className='option__text'>{props.count}. {props.optionText}</p>
    <button 
      className='button button--link'
      onClick = {() => {
        props.handleDeleteOption(props.optionText);
      }}
    >
    Remove
    </button>
  </div>
)

  export default Option;