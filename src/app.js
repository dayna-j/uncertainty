// UncertaintyApp is the container element which will be given to ReactDom.render.
// The UncertaintyApp component renders all of the other components and passes
// props down into them.  (props are inputs to components..)
class UncertaintyApp extends React.Component {
    render() {
        const title = 'Uncertainty App';
        const subtitle = 'Put your life in the hands of a computer...';
        const options = ['Thing one', 'Thing two', 'Thing three'];
        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Action/>
                <Options options={options}/>
                <AddOption/>
            </div>
        );
    }
}
class Header extends React.Component {
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
                <button>What should I do?</button>
            </div>
        );
    }
}

// Render new p tag for each option (set text, set key..)

class Options extends React.Component {
    render() {
        return (
            <div>
                {
                    /* Insert each option into an Option component */
                    this.props.options.map((option) => 
                        <Option key={option} optionText={option}/>)
                }
            </div>
        );
    }
}
class Option extends React.Component {
    render() {
        return (
            <div>
                Option:  {this.props.optionText}
            </div>
        );
    }
}
class AddOption extends React.Component {
    render() {
        return ( 
            <div>
                AddOptions component
            </div>
        );
    }
}

ReactDOM.render(<UncertaintyApp/>, document.getElementById('app-root'));