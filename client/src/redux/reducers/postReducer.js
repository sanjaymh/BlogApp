import * as constants from './../constants';

export default function postReducer(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_POSTS:
            return action.payload;
        case constants.ADD_POST:
            return state.concat(action.payload);
        case constants.REMOVE_POST:
            return state.filter(post => post._id !== action.payload);
        case constants.UPDATE_POST:
            return state.map(post => {
                if (post._id === action.payload.postId)
                    return { ...post, ...action.payload.data };
                else
                    return post;
            });
        case constants.RESET_USER_INFO:
            return [];
        default:
            return state;
    }
}