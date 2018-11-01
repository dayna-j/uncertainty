import React from 'react';
import ReactDOM from 'react-dom';

class UncertaintyApp extends React.Component {
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
  
  const Header = (props) => {
    return (
      <div>
        <h1>{props.title}</h1>
        {props.subtitle && <h2>{props.subtitle}</h2>}
      </div>
    );
  }
  
  Header.defaultProps = {
    title: 'Uncertainty'
  };
  
  const Action = (props) => {
    return (
      <div>
        <button onClick={props.handlePick} disabled={!props.hasOptions}>What should I do?</button>
      </div>
    );
  }
  
  const Options = (props) => {
    return (
      <div>
        <button onClick={props.handleDeleteOptions}>Remove All</button>
        {props.options.length === 0 && <p>Please add an option to get started</p>}
        {
          props.options.map( (option) => (
            <Option
              key={option} 
              optionText={option} 
              handleDeleteOption={props.handleDeleteOption}
            />
          ))
        }
      </div>
    );
  };
  
  const Option = (props) => {
    return (
      <div>
        {props.optionText}
        <button 
          onClick = {() => {
            props.handleDeleteOption(props.optionText);
          }}
        >
        remove
        </button>
      </div>
    )
  }
  
  class AddOption extends React.Component {
    constructor(props) {
      super(props);
      this.handleAddOption = this.handleAddOption.bind(this);
      this.state = {
        error: undefined
      };
    }
    handleAddOption(event) {
      event.preventDefault();
  
      const option = event.target.elements.option.value.trim();
      const error =  this.props.handleAddOption(option);
      
      this.setState( () => ({ error: error}) )
      
      if(!error) {
        event.target.elements.option.value = '';
      }
    }
    render() {
      return (
        <div>
          {this.state.error && <p>{this.state.error}</p>}
          <form onSubmit={this.handleAddOption}>
            <input type="text" name="option" />
            <button>Add Option</button>
          </form>
        </div>
      );
    }
  }
  
  ReactDOM.render(<UncertaintyApp />, document.getElementById('app-root'));