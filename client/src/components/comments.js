import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { deleteCommentById } from "../redux/actions/commentActions"

const Comments = ({ history, postId,comments, dispatchDeleteAction }) => {
    
    const id = postId;

    const [selectedComment, setSelectedComment] = useState("");

    const showConfirmationModal = (event, commentId) => {
        event.preventDefault();
        setSelectedComment(commentId);
        window.$("#confirmationModal").modal("show")
    };

    const handleOnDelete = () => {
     
        dispatchDeleteAction(selectedComment, () =>{
            window.$('#confirmationModal').modal('hide');
            toast.success('Comment deleted Successfully!');
            history.replace(`/comments/${id}`);
        }, (message) => {
            window.$('#confirmationModal').modal('hide');
            toast.error(`Error: ${message}`);
            history.replace(`/comments/${id}`);  
        });
    }

    return (
        <React.Fragment>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        comments.map(comment => (
                            <tr key={comment._id}>
                                <td> 
                                    {comment._id}
                                </td>
                                <td>
                                    {comment.title}    
                                </td>
                                <td>{comment.description}</td>
                                <td>
                                    <Link to={`/comment-edit/${id}/${comment._id}`}>
                                        <i class="fas fa-edit"></i>
                                    </Link>
                                </td>
                                <td>
                                    <a href="/" onClick={(e) => showConfirmationModal(e, comment._id)}>
                                        <i className="fas fa-trash-alt fa-1x text-danger"></i>
                                    </a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Modal handleOnDelete={handleOnDelete} />
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => ({
    dispatchDeleteAction: (commentId, onSuccess, onError) => 
    dispatch(deleteCommentById(commentId, onSuccess, onError))
})

export default connect(null, mapDispatchToProps)(Comments);

const Modal = ({ handleOnDelete }) => (
    <div className="modal" id="confirmationModal" tabIndex="-1" role="dialog">
        <div role="document" className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirmation</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure, you want to delete this comment ?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" data-dismiss="modal" className="btn btn-secondary">
                        No
                    </button>
                    <button type="button" data-dismiss="modal" onClick={handleOnDelete} className="btn btn-primary">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    </div>
);