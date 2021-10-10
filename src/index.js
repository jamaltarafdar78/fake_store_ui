import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import { useSelector } from 'react-redux';
import { displayCategoryTextAndValue, titleCaseString } from './utils';
import { genPriceFilter } from './redux/reducers/price-filter';

const AppWithDispathcerAndState = () => {
  const dispatcher = useDispatch();
  const state = useSelector(
    ({ categories, products, priceFilter, ...rest }) => {
      const filteredProducts = products.filter(genPriceFilter(priceFilter));

      return {
        products: filteredProducts.map(
          ({ category, price, ...restProducts }) => ({
            category: titleCaseString(category),
            price: Number(price).toFixed(2),
            ...restProducts,
          })
        ),
        categories: displayCategoryTextAndValue(categories),
        ...rest,
      };
    }
  );
  return <App dispatcher={dispatcher} state={state} />;
};

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppWithDispathcerAndState />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
