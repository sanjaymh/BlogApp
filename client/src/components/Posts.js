import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { deletePostById } from "../redux/actions/postActions"

const Posts = ({ posts, dispatchDeleteAction }) => {
    const [selectedPost, setSelectedPost] = useState("");

    const showConfirmationModal = (event, postId) => {
        event.preventDefault();
        setSelectedPost(postId);
        window.$("#confirmationModal").modal("show")
    };

    const handleOnDelete = () => {
        dispatchDeleteAction(selectedPost, () =>{
            window.$('#confirmationModal').modal('hide');
            toast.success('Post deleted Successfully!');
        }, (message) => {
            window.$('#confirmationModal').modal('hide');
            toast.error(`Error: ${message}`);
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
                        posts.map(post => (
                            <tr key={post._id}>
                                <td>
                                    <Link to={`/comments/${post._id}`}>
                                        {post._id}
                                    </Link>
                                </td>
                                <td>
                                 {post.title}    
                                </td>
                                <td>{post.description}</td>
                                <td>
                                    <Link to={`/edit-post/${post._id}`}>
                                        <i class="fas fa-edit"></i>
                                    </Link>
                                </td>
                                <td>
                                    <a href="/" onClick={(e) => showConfirmationModal(e, post._id)}>
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
    dispatchDeleteAction: (postId, onSuccess, onError) => 
    dispatch(deletePostById(postId, onSuccess, onError))
})

export default connect(null, mapDispatchToProps)(Posts);

const Modal = ({ handleOnDelete }) => (
    <div className="modal" id="confirmationModal" tabIndex="-1" role="dialog">
        <div role="document" className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirmation</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure, you want to delete this post ?</p>
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

