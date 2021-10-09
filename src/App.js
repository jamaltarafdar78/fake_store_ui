import logo from './logo.svg';
import './App.css';
import { AppStatusTypes } from './redux/reducers/app-status';
import { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { Table } from './components/table';

function App({ dispatcher, state: { appStatus, products } }) {
  useEffect(() => {
    dispatcher(AppStatusTypes.LOADING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = useMemo(
    () => appStatus === AppStatusTypes.LOADING,
    [appStatus]
  );
  const showProducts = useMemo(
    () => appStatus === AppStatusTypes.DATA_LOADED && products.length > 0,
    [appStatus, products]
  );

  return (
    <div className="App">
      <header className="App-header">
        {isLoading && (
          <img
            src={logo}
            className={classNames('App-logo', 'App-logo-spin')}
            alt="logo"
          />
        )}

        {showProducts && (
          <Table data={products} tableHeadings={['Product Id', 'Title']} />
        )}

        <p>{appStatus}</p>
        {showProducts && (
          <button onClick={() => dispatcher(AppStatusTypes.LOADING)}>
            Reload Products
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
