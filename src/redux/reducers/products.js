export const ProductDataTypes = {
  EMPTY: 'products_empty',
  RETRIEVED: 'products_retreived',
};

const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case ProductDataTypes.EMPTY:
      return [];
    case ProductDataTypes.RETRIEVED:
      return payload;
    default:
      return state;
  }
};

export default reducer;
