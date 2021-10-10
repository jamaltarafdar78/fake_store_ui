import { genPriceFilter, PriceFilterTypes } from './price-filter';

const products = [1000, 0, -10, 50].map((price) => ({
  price,
}));

describe('price-filter.genPriceFilter', () => {
  test('with NO filter type, all product are returned', () => {
    expect(
      products.filter(
        genPriceFilter({ type: PriceFilterTypes.NONE, payload: 0 })
      )
    ).toStrictEqual(products);
  });

  test('with GT filter type with payload -1, all products with prices greater than are returned', () => {
    const payload = -1;
    expect(
      products.filter(genPriceFilter({ type: PriceFilterTypes.GT, payload }))
    ).toStrictEqual(products.filter(({ price }) => price > payload));
  });

  test('with GT filter type with payload 50, all products with prices greater than are returned', () => {
    const payload = 50;
    expect(
      products.filter(genPriceFilter({ type: PriceFilterTypes.GT, payload }))
    ).toStrictEqual(products.filter(({ price }) => price > payload));
  });
  test('with EQ filter type with payload 0, all products with prices EQUAL returned', () => {
    const payload = 0;
    expect(
      products.filter(genPriceFilter({ type: PriceFilterTypes.EQ, payload }))
    ).toStrictEqual(products.filter(({ price }) => price === payload));
  });
  test('with LT filter type with payload 0, all products with prices less than are returned', () => {
    const payload = 0;
    expect(
      products.filter(genPriceFilter({ type: PriceFilterTypes.LT, payload }))
    ).toStrictEqual(products.filter(({ price }) => price < payload));
  });
});
