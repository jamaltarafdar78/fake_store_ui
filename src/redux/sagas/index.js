import { all } from 'redux-saga/effects';
import {
  getAllProductsAndCategoriesFromAction,
  getProductByCategoryFromAction,
} from './productsAndCategoriesSaga';

export function* sagas() {
  yield all([
    getAllProductsAndCategoriesFromAction(),
    getProductByCategoryFromAction(),
  ]);
}
