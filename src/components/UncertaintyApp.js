import React from 'react';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';

export default class UncertaintyApp extends React.Component {
    constructor (props) {
      super(props);
      this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
      this.handlePick = this.handlePick.bind(this);
      this.handleAddOption = this.handleAddOption.bind(this);
      this.handleDeleteOption = this.handleDeleteOption.bind(this);
      this.state = { 
        options: props.options
      };
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
    handleAddOption(option) {
      if(!option) {
        return 'Enter valid value to add item to list'
      } else if (this.state.options.indexOf(option) > -1) {
        return 'Duplicate options not allowed'
      }
  
      this.setState((prevState) => ({ options: prevState.options.concat(option) }))
  
      // this.setState( (prevState) => {
      //   return {
      //     options: prevState.options.concat(option)
      //   };
      // });
    }
  
    handleDeleteOptions() {
      this.setState( () => ({ options: [] }) );
    }
  
    handleDeleteOption(optionToRemove) {
      this.setState((prevState) => ({
        options: prevState.options.filter((option) => {
          return optionToRemove !== option;
        })
      }))
    }
  
    handlePick() {
      const randomNumber = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNumber];
      alert(option);
    }
    render() {
      const title = 'Uncertainty';
      const subtitle = 'Put your life in the hands of a computer';
      return (
        <div>
          <Header subtitle={subtitle} />
          <Action 
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
            />
          <Options 
            options={this.state.options} 
            handleDeleteOptions={this.handleDeleteOptions}
            handleDeleteOption={this.handleDeleteOption}
          />
          
          <AddOption 
            handleAddOption={this.handleAddOption}
          />
        </div>
      );
    }
  }
  
  UncertaintyApp.defaultProps = {
    options: []
  }