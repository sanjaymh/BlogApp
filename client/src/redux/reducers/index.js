import { combineReducers } from "redux";

import user from "./userReducer";
import posts from "./postReducer";
import comments from "./commentsReducer"

const rootReducer = combineReducers({
    user, posts, comments
})

export default rootReducer;