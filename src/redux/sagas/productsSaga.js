import { call, put, takeEvery } from 'redux-saga/effects';
import { getProducts } from '../../services';
import { AppStatusTypes } from '../reducers/app-status';
import { ProductDataTypes } from '../reducers/products';

export function* fetchProducts() {
  try {
    const products = yield call(getProducts);
    yield put({ type: AppStatusTypes.DATA_LOADED });
    yield put({ type: ProductDataTypes.RETRIEVED, payload: products });
  } catch (e) {
    yield put({ type: AppStatusTypes.LOADING_ERROR });
  }
}

export function* getProductsFromAction() {
  yield takeEvery(AppStatusTypes.LOADING, fetchProducts);
}
