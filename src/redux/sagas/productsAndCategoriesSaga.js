import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getProducts, getCategories } from '../../services';
import { AppStatusTypes } from '../reducers/app-status';
import { ProductDataTypes } from '../reducers/products';
import { CategoriesTypes } from '../reducers/categories';

export function* fetchAllProductsAndCategories() {
  try {
    const [products, categories] = yield all([
      call(getProducts),
      call(getCategories),
    ]);
    yield put({ type: ProductDataTypes.RETRIEVED, payload: products });
    yield put({ type: CategoriesTypes.RETRIEVED, payload: categories });
    return yield put({ type: AppStatusTypes.DATA_LOADED });
  } catch (e) {
    return yield put({ type: AppStatusTypes.LOADING_ERROR });
  }
}

export function* getAllProductsAndCategoriesFromAction() {
  yield takeEvery(AppStatusTypes.LOADING_ALL, fetchAllProductsAndCategories);
}
