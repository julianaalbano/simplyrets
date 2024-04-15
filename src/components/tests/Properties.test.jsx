import { render, screen } from '@testing-library/react';
import Properties, { TEST_ID } from '../Properties';

const noop = () => {};

test('renders the properties container', () => {
  render(<Properties properties={[]} addFavorite={noop} removeFavorite={noop} />);
  const propertiesContainer = screen.getByTestId(TEST_ID.PROPERTIES);
  expect(propertiesContainer).toBeInTheDocument();
});
test('renders the correct number of properties', () => {
  const stubProperties = [
    {
      address: { city: '', state: '', streetName: '' },
      listDate: '',
      listPrice: 123456,
      mlsId: '123',
      photos: [],
      property: { area: 1234, bathsFull: 1, bathsHalf: 1, bedrooms: 1 }
    },
    {
      address: { city: '', state: '', streetName: '' },
      listDate: '',
      listPrice: 456789,
      mlsId: '456',
      photos: [],
      property: { area: 5678, bathsFull: 2, bathsHalf: 2, bedrooms: 2 }
    }
  ]
  render(<Properties properties={stubProperties} addFavorite={noop} removeFavorite={noop} />);
  const propertiesContainer = screen.getByTestId(TEST_ID.PROPERTIES);
  expect(propertiesContainer).toBeInTheDocument();
  const properties = screen.getAllByTestId(TEST_ID.PROPERTY);
  expect(properties.length).toBe(stubProperties.length);
});