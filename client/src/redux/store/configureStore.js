import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
    const store = createStore(
        reducer,
        composeEnhancers(
            applyMiddleware(thunk),
        )
    );
    return store;
}
