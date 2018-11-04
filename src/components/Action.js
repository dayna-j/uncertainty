// the Action component renders a div containing the large button in the UI reading:  What should I do?
// handlePick is an event handler bound on UncertaintyApp.  It was passed to Action via props
// hasOptions checks whether the options array is empty. If so, it disables the button
import React from 'react';

const Action = (props) => (
  <div>
    <button className='big-button' onClick={props.handlePick} disabled={!props.hasOptions}>What should I do?</button>
  </div>
);

  export default Action;