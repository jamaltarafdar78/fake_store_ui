export const ProductDataTypes = {
  EMPTY: 'empty',
  RETRIEVED: 'RETRIEVED',
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
