
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import RootRouter from './routes/RootRouter'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <RootRouter />
  </Provider>,
  document.getElementById('root')
);
