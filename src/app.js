// import React from 'react';
// import ReactDOM from 'react-dom';

class UncertaintyApp extends React.Component {
  constructor (props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = { 
      options: []
    };
  }
  handleAddOption(option) {
    if(!option) {
      return 'Enter valid value to add item to list'
    } else if (this.state.options.indexOf(option) > -1) {
      return 'Duplicate options not allowed'
    }

    this.setState( (prevState) => {
      return {
        options: prevState.options.concat(option)
      };
    });
  }
  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      };
    });
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
        <Header title={title} subtitle={subtitle} />
        <Action 
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
          />
        <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} />
        <AddOption 
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}

class Header extends React.Component {
  // props come from UncertaintyApp
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  
  render() {
    return (
      <div>
        <button onClick={this.props.handlePick} disabled={!this.props.hasOptions}>What should I do?</button>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteOptions}>Remove All</button>
        {
          this.props.options.map((option) => <Option key={option} optionText={option} />)
        }
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
      <div>
        {this.props.optionText}
      </div>
    );
  }
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
    this.setState( () => {
      return {
        error: error
      };
    });
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
