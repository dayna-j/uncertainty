'use strict';

var log = function log(msg) {
    return console.log(msg);
};

var appRoot = document.getElementById('app-root');

var app = {
    title: 'Uncertainty App',
    // subtitle: 'Put your life in the hands of a computer..',
    options: ['One', 'Two']
};

var onFormSubmit = function onFormSubmit(event) {
    event.preventDefault();

    var option = event.target.elements.option.value;
    if (option) {
        app.options.push(option);
        event.target.elements.option.value = '';
        renderFormSubmit();
    }
};

// Create "Remove All" button above list
// onClick -> wipe the array -> rerender


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
            null,
            'Remove All'
        ),
        React.createElement(
            'ol',
            null,
            React.createElement(
                'li',
                null,
                'Item one'
            ),
            React.createElement(
                'li',
                null,
                'Item two'
            )
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
