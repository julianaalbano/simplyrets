import { render, screen } from '@testing-library/react';
import Property, { TEST_ID } from '../Property';

const noop = () => { };
const stubProperty = {
  address: { city: 'Seattle', state: 'Washington', streetName: 'ABC Blvd' },
  listDate: '1991-12-12T00:45:02.01603Z',
  listPrice: 123456,
  mlsId: '123',
  photos: ['https://s3-us-west-2.amazonaws.com/cdn.simplyrets.com/properties/trial/home14.jpg'],
  property: { area: 1234, bathsFull: 1, bathsHalf: 1, bedrooms: 1 }
};
test('renders the property container', () => {
  render(<Property property={stubProperty} addFavorite={noop} removeFavorite={noop} />);
  const propertyContainer = screen.getByTestId(TEST_ID.PROPERTY);
  expect(propertyContainer).toBeInTheDocument();
});
test('renders the property image', () => {
  render(<Property property={stubProperty} addFavorite={noop} removeFavorite={noop} />);
  const propertyImage = screen.getByTestId(TEST_ID.IMAGE);
  expect(propertyImage).toBeInTheDocument();
});
test('renders the correct `specs` for the property', () => {
  render(<Property property={stubProperty} addFavorite={noop} removeFavorite={noop} />);
  const propertySpecs = screen.getByTestId(TEST_ID.SPECS);
  expect(propertySpecs).toBeInTheDocument();
  const specsText = screen.getByText('1 BR | 1.5 Bath | 1234 Sq Ft');
  expect(specsText).toBeInTheDocument();
});
test('renders the price correctly', () => {
  render(<Property property={stubProperty} addFavorite={noop} removeFavorite={noop} />);
  const propertyPrice = screen.getByTestId(TEST_ID.PRICE);
  expect(propertyPrice).toBeInTheDocument();
  const priceText = screen.getByText('$123,456.00');
  expect(priceText).toBeInTheDocument();
});
test('renders the address correctly', () => {
  render(<Property property={stubProperty} addFavorite={noop} removeFavorite={noop} />);
  const propertyAddress = screen.getByTestId(TEST_ID.ADDRESS);
  expect(propertyAddress).toBeInTheDocument();
  const addressText = screen.getByText('ABC Blvd, Seattle, WA');
  expect(addressText).toBeInTheDocument();
});
test('renders the property listed date', () => {
  render(<Property property={stubProperty} addFavorite={noop} removeFavorite={noop} />);
  const listedDate = screen.getByTestId(TEST_ID.DATE);
  expect(listedDate).toBeInTheDocument();
});