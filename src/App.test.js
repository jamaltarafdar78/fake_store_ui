import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { AppStatusTypes } from './redux/reducers/app-status';

const mockDispatcher = jest.fn();

describe('<App />', () => {
  beforeEach(() => {
    render(
      <App dispatcher={mockDispatcher} state={{ appStatus: 'Loading' }} />
    );
  });

  afterEach(() => {
    mockDispatcher.mockReset();
  });

  test('App dispatches Loading type when mounted', () => {
    expect(mockDispatcher).toHaveBeenCalledWith(AppStatusTypes.LOADING);
  });

  test('Stop loading is available and connected to dispatcher correctly', () => {
    const stopLoading = screen.getByText(/Stop Loading/i);
    expect(stopLoading).toBeInTheDocument();

    userEvent.click(stopLoading);

    expect(mockDispatcher).toHaveBeenLastCalledWith(AppStatusTypes.DATA_LOADED);
  });

  test('Restart loading is available and connected to dispatcher correctly', () => {
    const restartLoading = screen.getByText(/Restart Loading/i);
    expect(restartLoading).toBeInTheDocument();
    userEvent.click(restartLoading);

    expect(mockDispatcher).toHaveBeenLastCalledWith(AppStatusTypes.LOADING);
  });
});
