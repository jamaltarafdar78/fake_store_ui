import { render, screen } from '@testing-library/react';
import App from './App';
import { AppStatusTypes } from './redux/reducers/app-status';

const mockDispatcher = jest.fn();

describe('<App />', () => {
  afterEach(() => {
    mockDispatcher.mockReset();
  });

  test('App dispatches Loading type when mounted', () => {
    render(
      <App
        dispatcher={mockDispatcher}
        state={{ appStatus: null, products: [], categories: [] }}
      />
    );
    expect(mockDispatcher).toHaveBeenCalledWith({
      type: AppStatusTypes.LOADING_ALL,
    });
  });

  test('When products loaded, they are displayed, and reloading dispatches the correct action', () => {
    render(
      <App
        dispatcher={mockDispatcher}
        state={{
          appStatus: AppStatusTypes.DATA_LOADED,
          products: [
            { id: 1, title: 'product 1' },
            { id: 2, title: 'product 2' },
          ],
          categories: ['category 1', 'category 2'],
        }}
      />
    );

    const product1 = screen.getByText(/product 1/i);
    expect(product1).toBeInTheDocument();

    const product2 = screen.getByText(/product 1/i);
    expect(product2).toBeInTheDocument();

    const allCategories = screen.getByText(/All/i);
    expect(allCategories).toBeInTheDocument();
  });
});
