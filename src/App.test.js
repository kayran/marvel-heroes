import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders subtitle', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/EXPLORE O UNIVERSO/i);
  expect(linkElement).toBeInTheDocument();
});
