import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { toast } from 'react-toastify';

import { getCommentById, editCommentById } from "../redux/actions/commentActions";
import { useParams } from 'react-router-dom';

const EditComment = ({ 
    history, dispatchEditCommentByIdAction, 
    dispatchGetCommentByIdAction
 }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState({ title: false, description: false });

    const { id, commentId } = useParams();

    useEffect(() => {
        if(commentId) {
            dispatchGetCommentByIdAction(commentId, ( data ) =>{
                
                setTitle(data.comment.title);
                setDescription(data.comment.description);
            });
        }
    }, [dispatchGetCommentByIdAction, commentId]);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if(isFormInvalid()) updateErrorFlags();
        if(commentId) {
                dispatchEditCommentByIdAction (commentId, { title, description },
                    () => {
                        toast.success("Edited the comment");
                        history.replace(`/comments/${id}`)
                    },
                    (message) => {
                        toast.error(`Error: ${message}`);
                        history.replace(`/comments/${id}`)
                    });
            }
    }


    const isFormInvalid = () => (!title.trim() || !description.trim());

    const updateErrorFlags = () => {
        const errObj = { title: false, description: false };
        if(!title.trim()) errObj.title = true;
        if(!description.trim()) errObj.description = true;
        setError(errObj);
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <h2>Edit Comment</h2>
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
        </React.Fragment>
    )

}

const mapDispatchToProps = dispatch => ({
    dispatchGetCommentByIdAction: (commentId, onSuccess) => 
        dispatch(getCommentById(commentId, onSuccess)),
    dispatchEditCommentByIdAction: (commentId, data, onSuccess, onError) => 
        dispatch(editCommentById(commentId, data, onSuccess, onError))
})

export default connect(null, mapDispatchToProps)(EditComment);