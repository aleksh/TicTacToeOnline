// Core
import { createStore } from "redux";
import { enhancedStore, history, sagaMiddleware } from "./middleware/core";
// Roots
import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";



export const store = createStore(rootReducer(history), enhancedStore);

sagaMiddleware.run(rootSaga);
