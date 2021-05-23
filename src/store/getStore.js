import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';

import createSagaMiddleware from 'redux-saga';

import { rootSaga } from 'sagas';
import { rootReducer } from 'reducers';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(
        sagaMiddleware
    )
);
const store = createStore(
    rootReducer,
    enhancer
);

export const getStore = () => store;

sagaMiddleware.run(rootSaga);