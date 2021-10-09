import { call, put, takeEvery } from 'redux-saga/effects';
import { AppStatusTypes } from '../reducers/app-status';
import { ProductDataTypes } from '../reducers/products';

const apiURL = 'https://fakestoreapi.com/products';

const getProducts = () => fetch(apiURL).then((response) => response.json());

function* fetchProducts() {
  try {
    const products = yield call(getProducts);
    yield put({ type: AppStatusTypes.DATA_LOADED });
    yield put({ type: ProductDataTypes.RETRIEVED, payload: products });
  } catch (e) {
    console.error(e);
    yield put({ type: AppStatusTypes.LOADING_ERROR });
  }
}

export function* getProductsFromAction() {
  yield takeEvery(AppStatusTypes.LOADING, fetchProducts);
}
