import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import { websocketSaga } from '../sagas/websocketSaga';

const saga = createSagaMiddleware();
const websocketMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewareEnhancer = applyMiddleware(saga, websocketMiddleware);

const store = createStore(
  persistedReducer,
  composeEnhancers(middlewareEnhancer)
);

const persistor = persistStore(store);

saga.run(rootSaga);
websocketMiddleware.run(websocketSaga);

export default store;

export { persistor };