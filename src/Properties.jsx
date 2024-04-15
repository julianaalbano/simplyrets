import React from 'react';
import Property from './Property';

/**
 * @param {object} props - React component props
 * @param {Array} props.properties - list of properties
 * @returns {React.Component} Property Listings Page
 */
const Properties = ({ properties }) => {
  return (
    <div className='properties'>
      {properties.map(property => <Property key={property.mlsId} property={property} />)}
    </div>
  );
}

export default Properties
