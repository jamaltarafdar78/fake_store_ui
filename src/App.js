import logo from './logo.svg';
import './App.css';
import { AppStatusTypes } from './redux/reducers/app-status';
import { useEffect } from 'react';
import classNames from 'classnames';

function App({ dispatcher, state: { appStatus } }) {
  useEffect(() => {
    dispatcher(AppStatusTypes.LOADING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className={classNames('App-logo', {
            'App-logo-spin': appStatus === AppStatusTypes.LOADING,
          })}
          alt="logo"
        />
        <p>{appStatus}</p>
        <button onClick={() => dispatcher(AppStatusTypes.DATA_LOADED)}>
          Stop Loading
        </button>
        <button onClick={() => dispatcher(AppStatusTypes.LOADING)}>
          Restart Loading
        </button>
      </header>
    </div>
  );
}

export default App;
