// ./src/store/configureStore.js

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas'; // TODO: Next step

// Dispatch logging utility
const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

//  Returns the store instance
// It can  also take initialState argument when provided
const configureStore = (initialState) => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware, logger)
    )

    store.runSaga = sagaMiddleware.run(rootSaga);
    store.close = ()=> store.dispatch(END);
    return store;
  
};

export default configureStore;