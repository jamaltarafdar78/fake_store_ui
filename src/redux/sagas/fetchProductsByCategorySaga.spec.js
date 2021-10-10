import createSagaMiddleware, { runSaga } from '@redux-saga/core';
import { applyMiddleware, createStore } from 'redux';
import * as Services from '../../services';
import rootReducer from '../reducers';
import { AppStatusTypes } from '../reducers/app-status';
import { fetchProductsByCategory } from './productsAndCategoriesSaga';

describe('fetchProductsByCategory saga', () => {
  let sagaMiddleware, store;

  beforeEach(() => {
    sagaMiddleware = createSagaMiddleware();
    store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  });

  test('WHEN data retrived successfully THEN the store is updated with retreived products and appStatus is DATA_LOADED', async () => {
    const retrivedProducts = [
      { id: 1, title: 'product1' },
      { id: 2, title: 'product2' },
    ];
    const category = 'Category 1';

    const mockedService = jest
      .spyOn(Services, 'getProductsByCategory')
      .mockResolvedValue(retrivedProducts);

    const { appStatus, products, categories } = store.getState();
    expect(categories).toEqual([]);
    expect(products).toEqual([]);
    expect(appStatus).toEqual(AppStatusTypes.LOADING_ALL);

    await runSaga(store, fetchProductsByCategory, {
      type: AppStatusTypes.LOAD_BY_CATEGORY,
      payload: category,
    });

    expect(mockedService).toHaveBeenCalledWith(category);

    const { appStatus: appStatusAfterLoading, products: productsAfterLoading } =
      store.getState();

    expect(productsAfterLoading).toEqual(retrivedProducts);
    expect(appStatusAfterLoading).toEqual(AppStatusTypes.DATA_LOADED);
  });

  test('WHEN data retrival fails  THEN the store is unaffected and appStatus is LOADING_ERROR', async () => {
    const category = 'Category 1';

    const mockedService = jest
      .spyOn(Services, 'getProductsByCategory')
      .mockRejectedValue('failed');

    const { appStatus, products, categories } = store.getState();
    expect(categories).toEqual([]);
    expect(products).toEqual([]);
    expect(appStatus).toEqual(AppStatusTypes.LOADING_ALL);

    await runSaga(store, fetchProductsByCategory, {
      type: AppStatusTypes.LOAD_BY_CATEGORY,
      payload: category,
    });

    expect(mockedService).toHaveBeenCalledWith(category);

    const { appStatus: appStatusAfterLoading, products: productsAfterLoading } =
      store.getState();

    expect(productsAfterLoading).toEqual([]);
    expect(appStatusAfterLoading).toEqual(AppStatusTypes.LOADING_ERROR);
  });
});
