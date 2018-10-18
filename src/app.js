const log = (msg) => console.log(msg);
// in order to render any elements to the browser dom, react needs to be given a root element.  Usually this is a div. 
let appRoot = document.getElementById('app-root');

const app = {
    title: 'Uncertainty App',
    // subtitle: 'Put your life in the hands of a computer..',
    options: ['One', 'Two']
};

const onFormSubmit = (event) => {
    // Event handler for form event
    
    event.preventDefault();
    // event.target gets the element that the event was triggered on. (the form)
    // [form].elements returns an object of type HTMLFormControlsCollection.  HTMLFormControlsCollection contains all of the
    // forms control elements (inputs, buttons etc.)  Each control element is given a property matching its name
    // Our form has a single input with the name option.  option.value returns the value of that text input.
        const option = event.target.elements.option.value;
    if (option) {
        // if something has been entered into the text input, push it into the options array on our app object
        app.options.push(option);
        // clear the text input
        event.target.elements.option.value = '';
        renderFormSubmit();
    }
};

const onRemoveAll = () => {
    // remove all items from options array.
    app.options = [];
    renderFormSubmit();
};

const numbers = [55, 101, 1000];

function renderFormSubmit() {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
            <p>{app.options.length}</p>
            <button onClick={onRemoveAll}>Remove All</button>
            <ol>
                {   /*map over app.options, getting back an array of list items*/
                    app.options.map(option => <li key={option}>Option: {option}</li>)
                }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type='text' name='option' />
                <button>Add Option</button>
            </form>
        </div> 
    );
    ReactDOM.render(template, appRoot);
};
renderFormSubmit();
