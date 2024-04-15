import React, { useState } from 'react';

import heartFill from '../assets/heart-fill.svg';
import heartStroke from '../assets/heart-stroke.svg';
import { STATES } from '../lib/const';
import { convertNumberPriceToStringPrice, formattedDate, isFavorite } from '../lib/utils';

export const TEST_ID = {
  PROPERTY: 'property'
};

/**
 * @param {object} props - component props
 * @param {Array} props.property - a single property
 * @param {Function} props.addFavorite - add a favorite listing
 * @param {Function} props.removeFavorite - remove a favorite listing
 * @returns {React.Component} a single property listing
 */
const Property = ({ property, addFavorite, removeFavorite }) => {
  const {
    address: { city, state, streetName },
    listDate,
    listPrice,
    mlsId,
    photos,
    property: { area, bathsFull, bathsHalf, bedrooms }
  } = property;
  const [isFavoriteListing, setIsFavorite] = useState(isFavorite({ mlsId }));
  const handleRemoveFavorite = () => {
    setIsFavorite(false);
    removeFavorite({ mlsId });
  }
  const handleAddFavorite = () => {
    setIsFavorite(true);
    addFavorite({ mlsId });
  }
  return (
    <div className='property' data-testid={TEST_ID.PROPERTY}>
      <div className='image'>
        <div hidden={!isFavoriteListing} onClick={handleRemoveFavorite}>
          <object data={heartFill} type='image/svg+xml' aria-label='Red heart' />
        </div>
        <div hidden={isFavoriteListing} onClick={handleAddFavorite}>
          <object data={heartStroke} type='image/svg+xml' aria-label='White outlined heart' />
        </div>
        <img src={photos[0]} alt={`MLS ID: ${mlsId}`} />
      </div>
      <p className='specs'>{`${bedrooms} BR | ${bathsFull + (bathsHalf / 2)} Bath | ${area} Sq Ft`}</p>
      <p className='price'>{convertNumberPriceToStringPrice({ numPrice: listPrice })}</p>
      <p className='address'>{`${streetName}, ${city}, ${STATES[state]}`}</p>
      <p className='listedDate'>{`Listed: ${formattedDate({ date: listDate })}`}</p>
    </div>
  );
}

export default Property;
