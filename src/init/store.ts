// Core
import { createStore } from 'redux';

// Roots
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { history } from './middleware/core'

// Middleware
import { enhancedStore, sagaMiddleware } from './middleware/core';

export const store = createStore(rootReducer(history), enhancedStore);

sagaMiddleware.run(rootSaga);
