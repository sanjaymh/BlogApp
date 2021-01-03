import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import axios from "axios";

import { createPost, getPostById, updatePostById } from "../redux/actions/postActions";

const EditPost = ({ match, history, dispatchCreatePostAction, dispatchGetPostByIdAction,
dispatchUpdatePostAction }) => {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState({title: false, description: false});

    useEffect(() => {
        const { postId } = match.params;
        if (postId) {
            dispatchGetPostByIdAction(postId, ({ title, description }) => {
                setTitle(title);
                setDescription(description);
            });
        }
    }, [dispatchGetPostByIdAction, match.params]);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if(isFormInvalid()) updateErrorFlags();
        else{
            const { postId } = match.params;
            const data = { title, description };
            if(postId) {
                dispatchUpdatePostAction(postId, data,
                () => {
                    toast.success("Post Updated Succesfully")
                    history.replace("/posts");
                },
                (message) => toast.error(`Error: ${message}`)
                )
            }else {
                dispatchCreatePostAction(data,
                () => {
                    toast.success("Post created successfully");
                    history.replace("/posts");
                },
                (message) => toast.error(`Error: ${message}`)
                )
            }
        }
    }

    const isFormInvalid = () => (!title.trim() || !description.trim());

    const updateErrorFlags = () => {
        const errObj = { title: false, description: false };
        if(!title.trim()) errObj.title = true;
        if(!description.trim()) errObj.description = true;
        setError(errObj);
    }

    return(
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <h2>Edit Post</h2>
                </div>
            </div>
            <div className="row align-items-center mt-4">
                <div className="col-9">
                    <form noValidate onSubmit={handleOnSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input noValidate id="title"
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`form-control ${error.title ? 'is-invalid' : ''}`} />
                            <p className="invalid-feedback">Required</p>
                        </div>
   
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input noValidate id="description"
                                type="text"
                                placeholder="Description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={`form-control ${error.description ? 'is-invalid' : ''}`} />
                            <p className="invalid-feedback">Required</p>
                        </div>

                        <div className="mt-5">
                            <button type="submit" className="btn btn-primary mr-2 btn-lg">
                                Save | <i className="fas fa-save"></i>
                            </button>
                            <button type="button"
                                onClick={() => history.replace("/posts")}
                                className="btn btn-secondary btn-lg">
                                Cancel | <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )

}

const mapDispatchToProps = (dispatch) => ({
    dispatchCreatePostAction: (data, onSuccess, onError) =>
        dispatch(createPost(data, onSuccess, onError)),
    dispatchUpdatePostAction: (postId, data, onSuccess, onError) =>
        dispatch(updatePostById(postId, data, onSuccess, onError)),
    dispatchGetPostByIdAction: (postId, onSuccess) => 
        dispatch(getPostById(postId, onSuccess))
})

export default connect(null, mapDispatchToProps)(EditPost);