const log = (msg) => console.log(msg);

let appRoot = document.getElementById('app-root');

const app = {
    title: 'Uncertainty App',
    // subtitle: 'Put your life in the hands of a computer..',
    options: ['One', 'Two']
};

const onFormSubmit = (event) => {
    event.preventDefault();

    const option = event.target.elements.option.value;
    if (option) {
        app.options.push(option);
        event.target.elements.option.value = '';
        renderFormSubmit();
        
    }
};

// Create "Remove All" button above list
// onClick -> wipe the array -> rerender


function renderFormSubmit() {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
            <p>{app.options.length}</p>
            <button >Remove All</button>
            <ol>
                <li>Item one</li>
                <li>Item two</li>
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

