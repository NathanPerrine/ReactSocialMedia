import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserProfile(props) {
    const base_url = props.base_url;
    const { loggedIn } = props;
    const { flashMessage } = props;
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn){
            flashMessage('You must be logged in to edit your profile.', 'danger')
            navigate('/login')
        }
    }, [loggedIn, flashMessage, navigate])

    useEffect(() => {
        let myToken = localStorage.getItem('token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${myToken}`);

        var requestOptions = {
            method : 'GET',
            headers : myHeaders,
            redirect : 'follow'
        };

        fetch(`${base_url}/auth/me`, requestOptions)
            .then(res => res.json())
            .then(data => {setUser(data)})

    }, []) 

    const updateContactInfo = async (e) => {
        e.preventDefault();

        let username = e.target.username.value;
        let email    = e.target.email.value;
        let myToken = localStorage.getItem('token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${myToken}`);
        myHeaders.append("Content-Type", "application/json");

        if (username.trim() !== ""){
            console.log("Updating Username.")
            var raw = JSON.stringify({
                "username": username.trim()
            });
            
            await sendUpdate(myHeaders, raw)
        };
        if (email.trim() !== ""){
            console.log("Updating Email.")
            var raw = JSON.stringify({
                "email" : email.trim()
            });

            await sendUpdate(myHeaders, raw)
        };
    }

    const sendUpdate = async (header, raw) => {

        var requestOptions = {
            method: 'PUT',
            headers: header,
            body: raw,
            redirect: 'follow'
          };

        fetch(`${base_url}/auth/users/${user.id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                setUser(data)
                props.flashMessage(`${data.username} has been updated.`, 'success')
            })

    }


    const updatePassword = (e) => {
        e.preventDefault();

        let oldpassword = e.target.oldpassword.value
        let newpassword = e.target.newpassword.value
        let confirmPass = e.target.confirmPass.value
        // How to check old password is correct?

        if (newpassword === confirmPass){
            let myToken = localStorage.getItem('token');
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${myToken}`);
            myHeaders.append("Content-Type", "application/json");
            
            var raw = JSON.stringify({
                "password" : confirmPass
            });

            sendUpdate(myHeaders, raw)
        } else {
            props.flashMessage("Passwords must match.", "warning")
        }
    }

    const handleDeleteEvent = (e) => {
        e.preventDefault()
        let myToken = localStorage.getItem('token')
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${myToken}`);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${base_url}/auth/users/${user.id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.error){props.flashMessage(data.error, 'danger')}
                else {
                    props.flashMessage("Your post has been deleted", "success")
                    props.logout()
                    navigate('/allposts')
                }
            })
    }

    return (
        <>
            <h2 className="border-bottom mt-4">My Profile | {user ? <>{user.username}</> : null}</h2>
            <p>Member since {user ? <>{user.date_created}</> : null} </p> 

            <div className="row mt-5">
                <div className="col-md-7">
                    <div className="row">
                        <div className="card bg-light"> {/* Contact Detail Card */}
                            <h5 className="card-title mt-1">Contact Detail</h5>
                            <form onSubmit={updateContactInfo}>
                                <div className="row"> {/*Info row*/}
                                    <div className="col-md-6">
                                        <label htmlFor="firstName">First Name</label>
                                        <input disabled type="text" name="firstName" className="form-control mt-1" placeholder="First Name:" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input disabled type="text" name="lastName" className="form-control mt-1" placeholder="Last Name:" />
                                    </div>
                                </div>
                                <div className="row justify-content-center"> {/*contact row*/}
                                    <div className="col-md-6">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" name="username" className="form-control mt-1" placeholder="Username:" />
                                    </div>
                                    <div className="col-md-6 ">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" name="email" className="form-control mt-1" placeholder="Email:" />
                                    </div>
                                    <input type="submit" className="btn btn-secondry border-secondary m-2 w-75" value="Save" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row"> {/* Change password card */}
                        <div className="card bg-light mt-2">
                            <h5 className="card-title mt-1">Change Password</h5>
                            <form onSubmit={updatePassword}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="oldpassword">Old Password</label>
                                        <input required type="password" name="oldpassword" className="form-control mt-1" placeholder="Old Password:" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="newpassword">New Password</label>
                                        <input required type="password" name="newpassword" className="form-control mt-1" placeholder="New Password:" />
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-12">
                                        <label htmlFor="confirmPass">Confirm Password</label>
                                        <input required type="password" name="confirmPass" className="form-control mt-1" placeholder="Confirm Password: " />
                                    </div>
                                    <input type="submit" className="btn btn-secondry border-secondary m-2 w-75" value="Save" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row"> {/* Delete Profile Card */}
                        <div className="card bg-light mt-2">
                            <h5 className="card-title mt-1 text-center">Delete Profile</h5>
                            <div className="row justify-content-center">
                                <button className="btn btn-danger w-25 my-2" onClick={(e) => e.preventDefault()} data-bs-toggle="modal" data-bs-target="#deleteModal" ><i className="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>

                </div> {/* end of main column */}

                <div className="card col-md-4 offset-md-1 d-flex flex-column justify-content-center p-2">
                    <p className="text-center">Profile Image</p>
                    <img src="https://via.placeholder.com/150" className="image-fluid" />
                    <button disabled className="btn btn-light w-100 mt-2">Upload Picture</button>
                </div>
            </div>
            
        
        {user ? 
        <>
        {/* <!-- Delete Modal --> */}
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteModalLabel">Delete {user.username}?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    Warning: This cannot be undone.
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button className="btn btn-danger " data-bs-dismiss="modal" onClick={(e) => handleDeleteEvent(e)} ><i className="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
        </>

        : null}

        </>
    )
}
