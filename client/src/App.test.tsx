import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const props = {
  params: ['first param', 'second param', 'third param'],
};

test('renders learn react link', () => {
  render(<App {...props} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInstanceOf(HTMLElement);
});
