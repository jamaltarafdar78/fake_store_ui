import { combineReducers } from 'redux';
import appStatus from './app-status';
import products from './products';

const rootReducer = combineReducers({
  appStatus,
  products,
});

export default rootReducer;
