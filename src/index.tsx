import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import store  from './tools/store';
import { Provider } from 'react-redux';

import { Reset } from 'styled-reset';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Reset />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
