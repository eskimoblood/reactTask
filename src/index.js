import React from 'react';
import { render } from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk';
import user from './reducers'
import App from './App';
import './index.css';
let store = createStore(
  user,
  {
    state: 'NOT_ASKED',
    time: 0
  },
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
