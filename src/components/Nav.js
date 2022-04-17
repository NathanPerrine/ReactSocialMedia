import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">RSM</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav w-100 d-flex justify-content-between">
                    <div className="d-flex">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        <Link className="nav-link" to="/allposts">All Posts</Link>
                        { props.loggedIn ?
                        <>
                            <Link className="nav-link" to="/createpost">Create Post</Link>
                        </>
                        : null}
                    </div>


                    <div className="d-flex">
                        {/* If user is logged in displays the logout link, else shows sign up/ login */}
                        { props.loggedIn ?
                        <>
                            <Link className="nav-link" to="/userprofile" ><i className="fas fa-cog"></i></Link>
                            <Link className="nav-link" to="/" onClick={props.logUserOut}>Log Out</Link>
                        </>
                        : 
                        <>
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                            <Link className="nav-link" to="/login">Login</Link>
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}