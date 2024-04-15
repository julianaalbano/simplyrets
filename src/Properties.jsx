import React from 'react';
import Property from './Property';

/**
 * @param {object} props - React component props
 * @param {Array} props.properties - list of properties
 * @param {Array} props.favorites - list of favorite properties
 * @param {Function} props.addFavorite - add a favorite listing
 * @param {Function} props.removeFavorite - remove a favorite listing
 * @returns {React.Component} Property Listings Page
 */
const Properties = ({ properties, favorites = [], addFavorite, removeFavorite }) => {
  return (
    <div className='properties'>
      {properties.map(property => {
        const isFavorite = favorites.indexOf(property.mlsId) >= 0;
        return (
          <Property
            key={property.mlsId}
            property={property}
            isFavorite={isFavorite}
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
