import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

var composeMiddleware;
if (process.env.NODE_ENV !== 'production') {
    composeMiddleware = compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
} else {
    composeMiddleware = compose(
        applyMiddleware(...middleware)
    );
}

const store = createStore(
  rootReducer,
  initialState,
  composeMiddleware
);

export default store;