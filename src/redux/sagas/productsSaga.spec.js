import createSagaMiddleware, { runSaga } from '@redux-saga/core';
import { applyMiddleware, createStore } from 'redux';
import * as Services from '../../services';
import rootReducer from '../reducers';
import { AppStatusTypes } from '../reducers/app-status';
import { fetchProductsAndCategories } from './productsAndCategoriesSaga';

test('WHEN fetchProducts saga is called and data retrived successfully THEN the store is updated with retreived products and appStatus is DATA_LOADED', async () => {
  const retrivedProducts = [
    { id: 1, title: 'product1' },
    { id: 2, title: 'product2' },
  ];

  const retrievedCategories = ['category 1', 'category 2'];

  jest.spyOn(Services, 'getProducts').mockResolvedValue(retrivedProducts);
  jest.spyOn(Services, 'getCategories').mockResolvedValue(retrievedCategories);

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  const { appStatus, products, categories } = store.getState();
  expect(categories).toEqual([]);
  expect(products).toEqual([]);
  expect(appStatus).toEqual(AppStatusTypes.LOADING);

  await runSaga(store, fetchProductsAndCategories);

  const { appStatus: appStatusAfterLoading, products: productsAfterLoading } =
    store.getState();

  expect(productsAfterLoading).toEqual(retrivedProducts);
  expect(appStatusAfterLoading).toEqual(AppStatusTypes.DATA_LOADED);
});

test('WHEN fetchProducts saga is called and data retrived has error THEN the store is unaffected and appStatus is LOADING_ERROR', async () => {
  jest.spyOn(Services, 'getProducts').mockRejectedValue('Retrival failed');

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  const { appStatus, products } = store.getState();
  expect(products).toEqual([]);
  expect(appStatus).toEqual(AppStatusTypes.LOADING);

  await runSaga(store, fetchProductsAndCategories);

  const {
    appStatus: appStatusAfterLoading,
    products: productsAfterLoading,
    categories: categoriesAfterLoading,
  } = store.getState();

  expect(productsAfterLoading).toEqual([]);
  expect(categoriesAfterLoading).toEqual([]);
  expect(appStatusAfterLoading).toEqual(AppStatusTypes.LOADING_ERROR);
});
