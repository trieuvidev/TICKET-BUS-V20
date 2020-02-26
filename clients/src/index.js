import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/Components/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {createStore, compose, applyMiddleware} from "redux";
import rootReducers from "./Redux/Reducers/rootReducer"
import reduxThunk from "redux-thunk"; 

const middlewares = [reduxThunk];

// create store
const store = createStore(
  rootReducers,
  compose(applyMiddleware(...middlewares),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

ReactDOM.render(
  <Provider store={store} > 
<App />
  </Provider>
, document.getElementById('root'));
serviceWorker.unregister();
