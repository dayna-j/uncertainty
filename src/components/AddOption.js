import React from 'react';

export default class AddOption extends React.Component {
    // AddOption component manages error state.  Initialized to undefined.
    state = {
      error: undefined
    };

    handleAddOption = (event) => {
      event.preventDefault();
      // get the trimmed text from the input
      const option = event.target.elements.option.value.trim();
      // handleAddOption is an event handler passed as props by UncertaintyApp
      const error =  this.props.handleAddOption(option);
      
      this.setState( () => ({ error: error}) )
      
      if(!error) {
        event.target.elements.option.value = '';
      }
    }
    render() {
      return (
        <div>
          {this.state.error && <p className='add-option-error'>{this.state.error}</p>}
          <form className='add-option' onSubmit={this.handleAddOption}>
            <input className='add-option__input' type="text" name="option" />
            <button className='button'>Add Option</button>
          </form>
        </div>
      );
    }
  }