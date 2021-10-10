export const CategoriesTypes = {
  EMPTY: 'categories_empty',
  RETRIEVED: 'categories_retreived',
};

const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case CategoriesTypes.EMPTY:
      return [];
    case CategoriesTypes.RETRIEVED:
      return payload;
    default:
      return state;
  }
};

export default reducer;
