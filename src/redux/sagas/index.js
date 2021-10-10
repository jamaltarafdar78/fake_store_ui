import { all } from 'redux-saga/effects';
import { getAllProductsAndCategoriesFromAction } from './productsAndCategoriesSaga';

export function* sagas() {
  yield all([getAllProductsAndCategoriesFromAction()]);
}
