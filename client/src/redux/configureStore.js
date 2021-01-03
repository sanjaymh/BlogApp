import { createStore, applyMiddleware,compose } from "redux";

import rootReducer from "./reducers/index";

import { apiMiddleware } from "./middleware";

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, compose(applyMiddleware(apiMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))
};