import React from 'react';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal';

export default class UncertaintyApp extends React.Component {
    // the state object is where Component state is managed.  
    // Component state allows us to manage data.  When the state-data changes, 
    // react will automatically rerender to reflect the new state.
    state = {
      // options array will contain the options to select from
      options: [],
      selectedOption: undefined
    }
    handleAddOption = (option) => {
      if(!option) {
        // string will be returned to AddOption as errors
        return 'Enter valid value to add item to list'
      } else if (this.state.options.indexOf(option) > -1)
       {
         // string will be returned to AddOption as errors
        return 'Duplicate options not allowed'
      }
      this.setState((prevState) => ({ options: prevState.options.concat(option) }))
    };
  
    handleDeleteOptions = () => {
      this.setState( () => ({ options: [] }) );
    };
  
    handleDeleteOption = (optionToRemove) => {
      // prevState is the previous state
      this.setState((prevState) => ({
        // set options state value to a new, filtered array.  
        // The new array will contain every option not equal to the one to be removed
        options: prevState.options.filter((option) => {
          return optionToRemove !== option;
        })
      }))
    };
    // ***babel-plugin-transform-class-properties is used here***
    handlePick = () => {
      // get a random number in ranger of [0, options.length]
      // Math.floor truncates any fractional component and returns an integer
      const randomNumber = Math.floor(Math.random() * this.state.options.length);
      // randomNumber will be a number [0, options.length]
      const option = this.state.options[randomNumber];
      // this.setState is used to trigger react to rerender the UI with the selected option
      this.setState(()=>({
        selectedOption: option
      }));
    };

    handleClearSelectedOption = () => {
      this.setState(()=> ({
        selectedOption: undefined
      }));
    }

    componentDidMount() {
      try {
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);
        if (options) {
          this.setState( ()=> ({ options }) );
        }
      } catch (error) {
        // if json data is invalid, do nothing.  fall back to empty array
        // which is set as default value
      }
      
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevState.options.length !== this.state.options.length) {
        const json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
      }
    }
    
    componentWillUnmount() {
      console.log('componentWillUnmount!')
    }
    
    render() {
      const title = 'Uncertainty';
      const subtitle = 'Put your life in the hands of a computer';
      return (
        <div>
          <Header title ='Uncertainty' subtitle={subtitle} />
          <div className='container'>
            <Action 
              hasOptions={this.state.options.length > 0}
              handlePick={this.handlePick}
            />
            <div className='widget'>
              <Options 
                options={this.state.options} 
                handleDeleteOptions={this.handleDeleteOptions}
                handleDeleteOption={this.handleDeleteOption}
              />
              <AddOption 
                handleAddOption={this.handleAddOption}
              />
            </div>
          </div>
          
          <OptionModal
            selectedOption={this.state.selectedOption}
            handleClearSelectedOption={this.handleClearSelectedOption}
          />
        </div>
      );
    }
  }
  
  UncertaintyApp.defaultProps = {
    options: []
  }