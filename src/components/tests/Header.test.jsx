import { render, screen } from '@testing-library/react';
import Header, { TEST_ID } from '../Header';

test('renders the headline', () => {
  render(<Header />);
  const heading = screen.getByTestId(TEST_ID.HEADER);
  expect(heading).toBeInTheDocument();
});
