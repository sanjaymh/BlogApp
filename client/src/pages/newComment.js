import React, { useState } from 'react';
import { connect } from 'react-redux';

import { toast } from 'react-toastify';

import { createComment } from "../redux/actions/commentActions";
import { useParams } from 'react-router-dom';

const NewComment = ({ history, dispatchCreateCommentAction }) => {

    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState({ title: false, description: false });

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if(isFormInvalid()) updateErrorFlags();
        dispatchCreateCommentAction(id, {title, description},
            () => {
                toast.success("Comment added")
                history.replace(`/comments/${id}`)
            },
            (message) => {
                toast.error(`Error:${message}`) 
            }
            )
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
                    <h2>Add your Comment</h2>
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
                                onChange={e => setTitle(e.target.value)}
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
                                onChange={e => setDescription(e.target.value)}
                                className={`form-control ${error.description ? 'is-invalid' : ''}`} />
                            <p className="invalid-feedback">Required</p>
                        </div>

                        <div className="mt-5">
                            <button type="submit" className="btn btn-primary mr-2 btn-lg">
                                Save | <i className="fas fa-save"></i>
                            </button>
                            <button type="button"
                                onClick={() => history.replace(`/comments/${id}`)}
                                className="btn btn-secondary btn-lg">
                                Cancel | <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>)
}

const mapDispatchToProps = dispatch => ({
    dispatchCreateCommentAction: (postId, data, onSuccess, onError) =>
    dispatch(createComment(postId, data, onSuccess, onError))
})

export default connect(null, mapDispatchToProps)(NewComment);

