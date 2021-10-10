import { useDispatch } from 'react-redux';

export const AppStatusTypes = {
  LOADING_ALL: 'loading',
  LOADING_ERROR: 'loading_error',
  DATA_LOADED: 'data_loaded',
};

const AppStatusTypesValues = Object.values(AppStatusTypes);

const initialState = AppStatusTypes.LOADING_ALL;
const reducer = (state = initialState, { type }) => {
  if (AppStatusTypesValues.includes(type)) return type;
  return state;
};

export default reducer;

export const useAppStatusDispatcher = () => {
  const dispatch = useDispatch();

  return (type) => dispatch({ type });
};
