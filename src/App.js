import logo from './logo.svg';
import './App.css';
import { AppStatusTypes } from './redux/reducers/app-status';
import { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { Table } from './components/table';
import { CategorySelector } from './components/category-selector';
import { PriceFilter } from './components/pricing-filter';

function App({ dispatcher, state: { appStatus, products, categories } }) {
  useEffect(() => {
    dispatcher({ type: AppStatusTypes.LOADING_ALL });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = useMemo(
    () =>
      appStatus === AppStatusTypes.LOADING_ALL ||
      appStatus === AppStatusTypes.LOAD_BY_CATEGORY,
    [appStatus]
  );
  const showProducts = useMemo(
    () => appStatus === AppStatusTypes.DATA_LOADED && products.length > 0,
    [appStatus, products]
  );

  const noMatchingProducts = useMemo(
    () => appStatus === AppStatusTypes.DATA_LOADED && products.length === 0,
    [appStatus, products]
  );
  return (
    <div className="App">
      <header className="App-header">
        {
          <>
            <CategorySelector
              categories={categories}
              dispatcher={dispatcher}
              disabled={isLoading}
            />
            <PriceFilter dispatcher={dispatcher} disabled={isLoading} />
          </>
        }
      </header>
      <main className="App-main">
        {isLoading && (
          <img
            src={logo}
            className={classNames('App-logo', 'App-logo-spin')}
            alt="logo"
          />
        )}

        {showProducts && (
          <Table
            data={products}
            tableHeadings={['Product Id', 'Title', 'Price', 'Category']}
          />
        )}

        {noMatchingProducts && <div>No matching products found</div>}

        {appStatus === AppStatusTypes.LOADING_ERROR && <div>Error</div>}
      </main>
    </div>
  );
}

export default App;
