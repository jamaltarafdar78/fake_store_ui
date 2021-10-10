import { all } from 'redux-saga/effects';
import { getProductsByCategory } from '../../services';
import { getAllProductsAndCategoriesFromAction } from './productsAndCategoriesSaga';

export function* sagas() {
  yield all([getAllProductsAndCategoriesFromAction(), getProductsByCategory()]);
}
