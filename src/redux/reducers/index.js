import { combineReducers } from 'redux';
import appStatus from './app-status';

const rootReducer = combineReducers({
  appStatus,
});

export default rootReducer;
