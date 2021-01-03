import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Posts from "../components/Posts";
import { fetchAllPosts } from "../redux/actions/postActions";

const PostCollection = ({ posts, dispatchFetchAllPostsAction }) => {

    useEffect(() => dispatchFetchAllPostsAction(), [dispatchFetchAllPostsAction]);

    return (
        <React.Fragment>
        <div className="row my-5">
            <div className="col-10">
                <h2>Blogs</h2>
            </div>
            <div className="col-2">
                <Link to="/edit-post" className="btn btn-primary">
                    Create Blog | <i className="fas fa-plus"></i>
                </Link>
            </div>
        </div>
        <div className="row mt-5">
            <div className="col-12">
                {
                    posts.length > 0 ? <Posts posts={posts} /> :
                    <div className="text-center mt-5">
                        <h2><i className="far fa-folder-open fa-3x"></i></h2>
                        <h1 className="text-center">You don't have any posts</h1>
                    </div>
                }
            </div>
        </div>
        </React.Fragment>
    )

}

const mapStateToProps = state => ({
    posts: state.posts
})

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllPostsAction: () => dispatch(fetchAllPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(PostCollection);