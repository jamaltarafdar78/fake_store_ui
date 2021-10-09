import { render, screen } from '@testing-library/react';
import App from './App';

const mockDispatcher = jest.fn();

test('renders learn react link', () => {
  render(<App dispatcher={mockDispatcher} state={{ appStatus: 'Loading' }} />);
  const stopLoading = screen.getByText(/Stop Loading/i);
  expect(stopLoading).toBeInTheDocument();

  const loading = screen.getByText(/Restart Loading/i);
  expect(loading).toBeInTheDocument();
});
