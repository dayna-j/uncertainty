class UncertaintyApp extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Action/>
                <Options/>
                <AddOption/>
            </div>
        )
    }
}
class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>Uncertainty App</h1>
                <h2>Put your life in the hands of a computer...</h2>
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

class Options extends React.Component {
    render() {
        return (
            <div>
                Options component
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