import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn, userName, onLogout }) => { 
  return(
    <nav className="navbar navbar-dark bg-dark" >
        <div className="container">
            <Link className="navbar-brand" to="/">
                <div className="d-flex align-items-center">
                    <i class="fab fa-blogger fa-3x"></i>
                    <span className="h4 pl-2">Blog App</span>
                </div>
            </Link>

            {isLoggedIn ?
            <button type="button" onClick={onLogout} className="btn btn-outline-warning">
                Logout | <i className="fas fa-sign-out-alt"></i>
            </button>
            : 
            (<div className="mt-auto p-2">
                <Link className="navbar-brand" to="/register">
                    <span class="navbar-text px-3">
                        Register
                    </span>
                </Link>
                <Link className="navbar-brand" to="/login">
                    <span class="navbar-text px-3">
                        Login
                    </span>
                </Link>
            </div>)
            }
        </div>
    </nav>
  )
}

export default Header;