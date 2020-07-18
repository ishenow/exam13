import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import usersReducers from './reducers/usersReducers';
import placesReducers from './reducers/placesReducers';
import galleryReducers from './reducers/galleryReducers';
import commentsReduces from './reducers/commentsReducers';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';
import axios from '../axiosApi';


export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  users: usersReducers,
  places: placesReducers,
  gallery: galleryReducers,
  comments: commentsReduces,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
  saveToLocalStorage({
    users: {
      user: store.getState().users.user,
    },
  });
});

axios.interceptors.request.use(config => {
  try {
    config.headers['Authorization'] = store.getState().users.user.token;
  } catch (e) {
    // do nothing, user is not logged in
  }

  return config;
});

export default store;
