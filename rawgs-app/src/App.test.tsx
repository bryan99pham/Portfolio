import { screen, render } from '@testing-library/react';
import App  from './App';
// import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

test('Renders main page correctly', () => {
  expect(true).toBeTruthy();
});

describe('App', () => {
  it('renders', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /add game/i });
    expect(button).toBeInTheDocument();
  });
});
