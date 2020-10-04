import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import reducers from '~/reducers';

const makeStore = (initialState) => {
  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  return createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export const wrapper = createWrapper(makeStore, { debug: true });
