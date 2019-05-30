import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import { createBrowserHistory } from "history";
import { applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';



const logger = createLogger({
    duration: true,
    collapsed: true,
    colors: {
        title: () => '#139BFE',
        prevState: () => '#1C5FAF',
        action: () => '#149945',
        nextState: () => '#A47104',
        error: () => '#ff0005',
    },
});

const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const devtools = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let composeEnhancers = compose;

const middleware = [sagaMiddleware, routerMiddleware];


if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    middleware.push(logger);

    composeEnhancers = devtools;
}

const enhancedStore = composeEnhancers(applyMiddleware(...middleware));

export { enhancedStore, sagaMiddleware, history };

