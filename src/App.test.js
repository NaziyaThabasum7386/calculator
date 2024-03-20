import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders calculator display and at least 16 buttons', () => {
  const { getByLabelText, getAllByRole } = render(<App />);
  
  const inputElement = getByLabelText('calculator-display');
  expect(inputElement).toBeInTheDocument();

  const buttons = getAllByRole('button');
  expect(buttons.length).toBeGreaterThanOrEqual(16);
});
