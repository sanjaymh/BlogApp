import * as constants from "../constants";

export default function commentsReducer (state = [], action) {
    
    switch (action.type) {
        
        case constants.SET_ALL_COMMENTS:
            return action.payload;

        case constants.EDIT_COMMENT:
            return state.map(comment => {
                if(comment._id === action.payload.commentId) {
                    return { ...state, ...action.payload.data }
                }
                else return state;
            })

        case constants.REMOVE_COMMENT:
            return state.filter(comment => (comment._id !== action.payload)) 
        
        default:
            return state
    }
}