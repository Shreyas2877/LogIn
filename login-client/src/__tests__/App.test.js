import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders app component', () => {
  render(<App />);
  const appElement = screen.getByTestId('app');
  expect(appElement).toBeInTheDocument();
});

test('renders welcome message', () => {
  render(<App />);
  const welcomeMessage = screen.getByText('Welcome to the App!');
  expect(welcomeMessage).toBeInTheDocument();
});

test('renders button', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
});

test('button click updates counter', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button');
  const counterElement = screen.getByTestId('counter');
  
  expect(counterElement.textContent).toBe('0');
  
  fireEvent.click(buttonElement);
  expect(counterElement.textContent).toBe('1');
  
  fireEvent.click(buttonElement);
  expect(counterElement.textContent).toBe('2');
});