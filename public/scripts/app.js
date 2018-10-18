'use strict';

var log = function log(msg) {
    return console.log(msg);
};
// in order to render any elements to the browser dom, react needs to be given a root element.  Usually this is a div. 
var appRoot = document.getElementById('app-root');

var app = {
    title: 'Uncertainty App',
    // subtitle: 'Put your life in the hands of a computer..',
    options: ['One', 'Two']
};

var onFormSubmit = function onFormSubmit(event) {
    // Event handler for form event

    event.preventDefault();
    // event.target gets the element that the event was triggered on. (the form)
    // [form].elements returns an object of type HTMLFormControlsCollection.  HTMLFormControlsCollection contains all of the
    // forms control elements (inputs, buttons etc.)  Each control element is given a property matching its name
    // Our form has a single input with the name option.  option.value returns the value of that text input.
    var option = event.target.elements.option.value;
    if (option) {
        // if something has been entered into the text input, push it into the options array on our app object
        app.options.push(option);
        // clear the text input
        event.target.elements.option.value = '';
        renderFormSubmit();
    }
};

var onRemoveAll = function onRemoveAll() {
    // remove all items from options array.
    app.options = [];
    renderFormSubmit();
};

var numbers = [55, 101, 1000];

function renderFormSubmit() {
    var template = React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            app.title
        ),
        app.subtitle && React.createElement(
            'p',
            null,
            app.subtitle
        ),
        React.createElement(
            'p',
            null,
            app.options.length > 0 ? 'Here are your options' : 'No options'
        ),
        React.createElement(
            'p',
            null,
            app.options.length
        ),
        React.createElement(
            'button',
            { onClick: onRemoveAll },
            'Remove All'
        ),
        React.createElement(
            'ol',
            null,
            /*map over app.options, getting back an array of list items*/
            app.options.map(function (option) {
                return React.createElement(
                    'li',
                    { key: option },
                    'Option: ',
                    option
                );
            })
        ),
        React.createElement(
            'form',
            { onSubmit: onFormSubmit },
            React.createElement('input', { type: 'text', name: 'option' }),
            React.createElement(
                'button',
                null,
                'Add Option'
            )
        )
    );
    ReactDOM.render(template, appRoot);
};
renderFormSubmit();
