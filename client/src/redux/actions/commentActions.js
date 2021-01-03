import * as constants from "../constants";

export const fetchAllComments = (id) => ({
    type: constants.API,
    payload: {
        method: "GET",
        url: `/api/comments/${id}`,
        success:(response) => (setAllComments(response))
    }
})

export const getCommentById =(commentId, onSuccess) => ({
    type: constants.API,
    payload: {
        method: "GET",
        url: `/api/comment/${commentId}`,
        postProcessSuccess: onSuccess
    }
});

export const createComment = (id,data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: "PUT",
        url: `/api/comment/${id}`,
        success: (response) => addComment(response),
        data,
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deleteCommentById = ( commentId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: "PUT",
        url: `/api/comment-delete/${commentId}`,
        success: () => removeComment(commentId),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const editCommentById = ( commentId, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: "PUT",
        url: `/api/comment-edit/${commentId}`,
        data,
        success: (commentId, data) => editComment(commentId, data),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const addComment = (data) => ({
    type: constants.ADD_COMMENT,
    payload: {
        data
    }
})

const setAllComments = (data) => ({
    type: constants.SET_ALL_COMMENTS,
    payload: data.data.comments
})

const editComment = (commentId, data) => ({
    type: constants.EDIT_COMMENT,
    payload:{
        commentId, data
    }
})

const removeComment = (commentId) =>({
    type: constants.REMOVE_COMMENT,
    payload: {
        commentId
    }
})