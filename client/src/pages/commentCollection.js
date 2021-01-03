import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Comments from "../components/comments";
import { fetchAllComments } from "../redux/actions/commentActions";
import { useParams } from "react-router";


const CommentPage = ({ comments,dispatchFetchAllCommentsAction }) => {
    const { id } = useParams();
    // console.log(id);
    useEffect( () =>{
    dispatchFetchAllCommentsAction(id)},[dispatchFetchAllCommentsAction, id]);
      
    return(
        <React.Fragment>
        <div className="row my-5">
            <div className="col-10">
                <h2>Comments</h2>
            </div>
            <div className="col-2">
                <Link to={`/comment-new/${id}`} className="btn btn-primary">
                    Comment | <i className="fas fa-plus"></i>
                </Link>
            </div>
        </div>

        <div className="row mt-5">
            <div className="col-12">
                {
                    comments.length > 0 ? <Comments postId={id} comments={comments} /> :
                        <div className="text-center mt-5">
                            <h2><i className="far fa-folder-open fa-3x"></i></h2>
                            <h1 className="text-center">No Comments to show</h1>
                        </div>
                }
            </div>
        </div>

    </React.Fragment>
    )
}

const mapStateToProps = state => ({
    comments: state.comments
})

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllCommentsAction: id => dispatch(fetchAllComments(id)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentPage);