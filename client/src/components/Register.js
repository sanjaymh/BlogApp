import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { registerUser } from "../redux/actions/authActions";

const Register = ({ dispatchUserRegisterAction }) => { 

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   

    const handleOnSubmit = (event) => { 
        event.preventDefault();
        dispatchUserRegisterAction(firstName, lastName, email, password,
            () => toast.success("Account created Successfully"),
            (message) => toast.error(`Error: ${message}`)
        )
    }

  return(
    <React.Fragment>
    <div className="form" style={{width:"40%", margin:"5% auto"}}>
        <form onSubmit={handleOnSubmit}>
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input noValidate id="firstName"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input noValidate id="lastName"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
                className="form-control"
                />                    
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input noValidate id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input noValidate id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="form-control"/>
                </div>
                <button className="btn btn-primary mr-2" type="submit">
                    Register | <i className="fas fa-user-plus"></i>
                </button>
                <button className="btn btn-outline-secondary">
                    Cancel | <i className="fas fa-times"></i>
                </button>            
        </form>
    </div>
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchUserRegisterAction: 
    (firstName, lastName, email, password, onSuccess, onError) => dispatch(registerUser({
        firstName, lastName, email, password}, onSuccess, onError))
})

export default connect(null, mapDispatchToProps)(Register);
