import { combineReducers } from 'redux';
import appStatus from './app-status';
import products from './products';
import categories from './categories';
import priceFilter from './price-filter';

const rootReducer = combineReducers({
  appStatus,
  products,
  categories,
  priceFilter,
});

export default rootReducer;
