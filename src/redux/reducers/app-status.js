import { useDispatch } from 'react-redux';

export const AppStatusTypes = {
  LOADING: 'loading',
  LOADING_ERROR: 'loading_error',
  DATA_LOADED: 'data_loaded',
};

const initialState = AppStatusTypes.LOADING;
const reducer = (state = initialState, { type }) => type;

export default reducer;

export const useAppStatusDispatcher = () => {
  const dispatch = useDispatch();

  return (type) => dispatch({ type });
};
