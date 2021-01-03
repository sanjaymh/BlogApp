import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';
import { logoutUser } from "../src/redux/actions/authActions";

import PostCollection from "../src/pages/postCollection";
import EditPost from "../src/pages/editPost";
import EditComment from "../src/pages/editComment";
import NewComment from "../src/pages/newComment"
import CommentPage from "../src/pages/commentCollection";
import Header from "./components/Header" ;
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

const App = ({ user, dispatchLogoutAction }) => { 
  return(
    <React.Fragment>
      <ToastContainer position="top-right" autoClose={2000}
       hideProgressBar transition={Slide} />
      <Header isLoggedIn={user.isLoggedIn} userName={user.fullName}
       onLogout={dispatchLogoutAction} />
      <div className="container my-5">
       {!user.isLoggedIn ?
          (<Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Redirect to="/" />
            </Switch>) : 
            <Switch>
              <Route exact path="/posts" component={PostCollection} />
              <Route exact path="/edit-post" component={EditPost} />
              <Route exact path="/edit-post/:postId" component={EditPost} />
              <Route exact path="/comments/:id" component={CommentPage} />
              <Route exact path="/comment-new/:id" component={NewComment} />
              <Route exact path="/comment-edit/:id/:commentId" component={EditComment} />
              <Redirect to="/posts" />
            </Switch>         
        } 
       </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  dispatchLogoutAction: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
