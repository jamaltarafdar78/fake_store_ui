export const PriceFilterTypes = {
  EQ: 'equals',
  LT: 'less than',
  GT: 'greater then',
  NONE: 'none',
};

export const PriceFilterTypesValues = Object.values(PriceFilterTypes);

const initialState = PriceFilterTypes.NONE;
const reducer = (state = initialState, { type, payload }) => {
  if (PriceFilterTypesValues.includes(type)) return { type, payload };
  return state;
};

export default reducer;

const NO_FILTER = () => true;
const EQ_FILTER =
  (valToCheckAgainst) =>
  ({ price }) =>
    price === valToCheckAgainst;
const GT_FILTER =
  (valToCheckAgainst) =>
  ({ price }) =>
    price > valToCheckAgainst;
const LT_FILTER =
  (valToCheckAgainst) =>
  ({ price }) =>
    price < valToCheckAgainst;

export const genPriceFilter = ({ type, payload }) => {
  try {
    const valToCheckAgainst = parseFloat(payload);

    switch (type) {
      case PriceFilterTypes.GT:
        return GT_FILTER(valToCheckAgainst);
      case PriceFilterTypes.LT:
        return LT_FILTER(valToCheckAgainst);
      case PriceFilterTypes.EQ:
        return EQ_FILTER(valToCheckAgainst);
      case PriceFilterTypes.NONE:
        return NO_FILTER;
      default:
        console.warn('invalid filter type, defaulting to NO_FILTER');
        return NO_FILTER;
    }
  } catch {
    console.warn('invalid value, defaulting to NO_FILTER');
    return NO_FILTER;
  }
};
