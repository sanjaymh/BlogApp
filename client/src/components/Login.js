import React, {useState} from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify"

import { loginUser } from "../redux/actions/authActions"

const Login =({ dispatchLoginAction }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatchLoginAction(email, password,
            () => toast.success("Logged in successfully"),
            (message) => toast.error(`Error: ${message}`)
            );
    }

    return(
    <React.Fragment>
      <div className="form" style={{width:"40%", margin:"5% auto"}}>
        <form noValidate onSubmit={handleOnSubmit}>
          <div className="form-group" >
              <label htmlFor="email">Email Address</label>
              <input noValidate id="email" 
              type="email" 
              name="email"
              placeholder="Email" 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="form-control" />
          </div>

          <div className="form-group" >
              <label htmlFor="password">Password</label>
              <input noValidate id="password" 
              type="password" 
              name="password"
              placeholder="Password" 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="form-control" />
          </div>
          <button className="btn btn-primary mr-2" type="submit">
              Login | <i className="fas fa-sign-in-alt"></i>
          </button>
          <button className="btn btn-outline-secondary">
              Cancel | <i className="fas fa-times"></i>
          </button>
        </form>
      </div>
    </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => ({
    dispatchLoginAction: (email, password, onSuccess, onError) => {
        dispatch(loginUser({email, password}, onSuccess, onError));
    }
})

export default connect(null, mapDispatchToProps)(Login);