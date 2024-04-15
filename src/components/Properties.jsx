import React from 'react';

import Property from './Property';

export const TEST_ID = {
  PROPERTIES: 'properties',
  PROPERTY: 'property'
};

/**
 * @param {object} props - component props
 * @param {Array} props.properties - list of properties
 * @param {Function} props.addFavorite - add a favorite listing
 * @param {Function} props.removeFavorite - remove a favorite listing
 * @returns {React.Component} property listings page
 */
const Properties = ({ properties, addFavorite, removeFavorite }) => {
  return (
    <div className='properties' data-testid={TEST_ID.PROPERTIES}>
      {properties.map(property => {
        return (
          <Property
            key={property.mlsId}
            property={property}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        )
      }
      )}
    </div>
  );
}

export default Properties
