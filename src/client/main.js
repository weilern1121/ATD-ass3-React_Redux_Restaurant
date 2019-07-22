import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/index';
import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import Sagas from './sagas';
//import theme - change nova-light to other theme as needed
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from './reducers';
import initialState from './initialState'

//create saga middleware
const sagaMiddleware = createSagaMiddleware();

//create store, add reducers, attach saga
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

//run saga(s)
sagaMiddleware.run(Sagas);


// const middleWare = [thunk];
//
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//     combineReducers,
//     initialState,
//     composeEnhancers(applyMiddleware(...middleWare))
// );

// Render the main component into the dom

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'));


