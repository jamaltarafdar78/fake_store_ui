import { combineReducers } from 'redux';
import appStatus from './app-status';
import products from './products';
import categories from './categories';

const rootReducer = combineReducers({
  appStatus,
  products,
  categories,
});

export default rootReducer;
