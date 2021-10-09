import { all } from 'redux-saga/effects';
import { getProductsFromAction } from './productsSaga';

export function* sagas() {
  yield all([getProductsFromAction()]);
}
