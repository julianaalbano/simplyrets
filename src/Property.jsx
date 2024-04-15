import React, { useState } from 'react';

import { STATES } from './const';
import heartFill from './assets/heart-fill.svg';
import heartStroke from './assets/heart-stroke.svg';
import { isFavorite } from 'utils';

// TODO: abstract out pricing logic + formatted date

const formattedDate = date => {
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  const year = date.slice(0, 4);
  return `${month}/${day}/${year}`;
};

/**
 * @param {object} props - component props
 * @param {Array} props.property - a single property
 * @param {Function} props.addFavorite - add a favorite listing
 * @param {Function} props.removeFavorite - remove a favorite listing
 * @returns {React.Component} a single property listing
 */
const Property = ({ property, addFavorite, removeFavorite }) => {
  const [isFavoriteListing, setIsFavorite] = useState(isFavorite(property.mlsId));
  const handleRemoveFavorite = () => {
    setIsFavorite(false);
    removeFavorite(property.mlsId);
  }
  const handleAddFavorite = () => {
    setIsFavorite(true);
    addFavorite(property.mlsId);
  }
  const {
    address: { city, state, streetName },
    listDate,
    listPrice,
    mlsId,
    photos,
    property: { area, bathsFull, bathsHalf, bedrooms }
  } = property;
  return (
    <div className='property'>
      <div className='image'>
        <div hidden={!isFavoriteListing} onClick={handleRemoveFavorite}>
          <object data={heartFill} type='image/svg+xml' aria-label='Red heart.' />
        </div>
        <div hidden={isFavoriteListing} onClick={handleAddFavorite}>
          <object data={heartStroke} type='image/svg+xml' aria-label='Outlined heart.' />
        </div>
        <img src={photos[0]} alt={`MLS ID: ${mlsId}`} />
      </div>
      <p className='specs'>{`${bedrooms} BR | ${bathsFull + (bathsHalf / 2)} Bath | ${area} Sq Ft`}</p>
      <p className='price'>{(listPrice).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })}</p>
      <p className='address'>{`${streetName}, ${city}, ${STATES[state]}`}</p>
      <p className='listedDate'>{`Listed: ${formattedDate(listDate)}`}</p>
    </div>
  );
}

export default Property
