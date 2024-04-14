import React from 'react';

import Property from 'Property';

/**
 * @param {object} props - React component props
 * @param {Array} props.properties - list of properties
 * @returns {React.Component} Property Listings Page
 */
const PropertyListings = ({ properties }) => {
  return (
    <div>
      {properties.map(property => <Property property={property} />)}
    </div>
  );
}

export default PropertyListings
