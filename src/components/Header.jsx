import React from 'react';

export const TEST_ID = {
  HEADER: 'header'
};

const Header = () => {
  return (
    <div className='header' data-testid={TEST_ID.HEADER}>
      <p>Property Listings</p>
    </div>
  );
}

export default Header;
