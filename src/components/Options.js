import React from 'react';
import Option from './Option';
// Options is a stateless functional component which renders our list of Option
const Options = (props) => (
  <div>
    <div className='widget-header'>
      <h3 className='widget-header__title'>Your options</h3>
      <button // the 'Remove All' button
        onClick={props.handleDeleteOptions}
        className = 'button button--link'
      >
        Remove All
      </button>
    </div>
    {props.options.length === 0 && <p className='widget__message'>Please add an option to get started</p>}
    {
      // map each option in the options array to an Option component
      props.options.map( (option,index) => (
        <Option
          key={option} 
          optionText={option} 
          count={index+1}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))
    }
  </div>
);

  export default Options;