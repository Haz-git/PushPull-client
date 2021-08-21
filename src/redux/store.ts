import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//Reducers:
import filterReducer from './filterOptions/filterReducer';

//Persistence:
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['filters'],
};

//Create Enhancers and Middlewares:
const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//RootReducer:
const appReducer = combineReducers({
    filters: filterReducer,
});

//Persisting formReducer:
const persistRootReducer = persistReducer(persistConfig, appReducer);

//Creating store with reducers and redux extension
const store = createStore(
    persistRootReducer,
    composeEnhancers(applyMiddleware(reduxThunk))
);

//Persisted Version of store:
const persistor = persistStore(store);

export { store, persistor };
