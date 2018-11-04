import React from 'react';
// Header is a stateless functional component.  Header is a presentational component with no dynamic behavior.
// Stateless, functional components do not support state or lifecycle methods.  Props is passed down from parent
const Header = (props) => (
  <div className='header'>
    <div className='container'> 
      <h1 className='header__title'>{props.title}</h1>
      {props.subtitle && <h2 className='header__subtitle'>{props.subtitle}</h2>}
    </div>
    
  </div>
);
  
  Header.defaultProps = {
    title: 'Uncertainty'
  };

  export default Header;