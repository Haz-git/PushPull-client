import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//Reducers:
import filterReducer from './filterOptions/filterReducer';
import workoutProgramReducer from './workoutPrograms/workoutProgramReducer';
import searchTermReducer from './searchTerms/searchTermsReducer';
import sortOptionReducer from './sortOptions/sortOptionsReducer';
import reviewReducer from './reviews/reviewReducer';
import authReducer from './auth/authReducer';
import profileReducer from './profile/profileReducer';
import builderReducer from './builder/builderReducer';
import projectTemplateReducer from './templates/projectTemplateReducer';
import templateReducer from './templates/templateReducer';
import { uiLoaderReducer } from './uiLoader/uiLoaderReducer';
import selectedBlockReducer from './selectedBlock/selectedBlockReducer';
import { errorReducer } from './errors/errorReducer';
import { modalReducer } from './modals/modalReducer';
import { viewTemplateReducer } from './viewTemplates/viewTemplateReducer';
import { genericNotificationReducer } from './genericNotifications/genericNotificationReducer';

//Persistence:
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'filters', 'searchTerms', 'sortOptions'],
};

//Create Enhancers and Middlewares:
const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//RootReducer:
const appReducer = combineReducers({
    user: authReducer,
    filters: filterReducer,
    workoutPrograms: workoutProgramReducer,
    searchTerms: searchTermReducer,
    sortOptions: sortOptionReducer,
    reviews: reviewReducer,
    profile: profileReducer,
    builderProjects: builderReducer,
    projectTemplates: projectTemplateReducer,
    template: templateReducer,
    uiLoader: uiLoaderReducer,
    toolbarSelectedBlock: selectedBlockReducer,
    errors: errorReducer,
    modals: modalReducer,
    viewTemplate: viewTemplateReducer,
    genericNotifications: genericNotificationReducer,
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
