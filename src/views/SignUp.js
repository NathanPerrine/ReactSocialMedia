import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {
    let navigate = useNavigate();
    let base_url = props.base_url
    const handleSubmit = (e) => {
        e.preventDefault();

        //Check passwords
        let password = e.target.password.value;
        let confirmPass = e.target.confirmPass.value;
        if (password !== confirmPass){
            props.flashMessage("Passwords don't match.", "warning");
        } else {
            // Sign User Up
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "username": e.target.username.value,
                "email": e.target.email.value,
                "password": password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${base_url}/auth/users`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        // Error message if an issue arises
                        props.flashMessage(data.error, "danger")
                    } else {
                        // Success, send message and navigate back home
                        props.flashMessage(`${data.username} has been registered.`, 'success')
                        navigate('/')
                    }
                });
        }
    }
  
    return (
    <form onSubmit={handleSubmit}>
        <h3 className="text-center">Sign Up</h3>
        <div className="row justify-content-center">
            <div className="form-group w-25">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" className="form-control" placeholder="Email"/>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" className="form-control" placeholder="Username"/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="form-control" placeholder="Password"/>
                <label htmlFor="confirmPass">Confirm Password</label>
                <input type="password" name="confirmPass" className="form-control" placeholder="Confirm Password"/>
                <input type="submit" className="btn btn-primary w-100 mt-2" value="Sign Up" />
            </div>
        </div>

    </form>
  )
}
