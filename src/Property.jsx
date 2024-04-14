import React from 'react';

// import heartFill from './assets/heart-fill.svg';
// import heartStroke from './assets/heart-stroke.svg';

/**
 * @param {object} props - React component props
 * @param {Array} props.property - a single property
 * @returns {React.Component} One property listing
 */
const Property = ({ property }) => {
  console.log(property);
  return (
    <div>
      <img src="" alt="" width="500" height="600" />
      <p>{property.listPrice}</p>
    </div>
  );
}

export default Property
