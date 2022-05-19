import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { mainReducer } from './main';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(mainReducer, composeEnhancers(applyMiddleware(thunk)));
