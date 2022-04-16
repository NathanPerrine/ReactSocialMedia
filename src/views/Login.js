import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';

export default function Login(props) {
    let navigate = useNavigate();
    let base_url = props.base_url

    const handleSubmit = (e) => {
        e.preventDefault();
        let username = e.target.username.value
        let password = e.target.password.value

        //Login request start
        var myHeaders = new Headers();
        // btoa - buf.toString?
        // myHeaders.append("Authorization", "Basic " + btoa(`${username}:${password}`));
        myHeaders.append("Authorization", "Basic " + Buffer.from(`${username}:${password}`).toString('base64'));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${base_url}/auth/token`, requestOptions)
            // .then(res => console.log(res.status))
            .then(res => {
                if (res.status === 401 ){ props.flashMessage("Username and/or password is incorrect.", "danger")}
                else {
                    res.json()
                    .then(data => {
                        let token = data.token 
                        localStorage.setItem('token', token)
                        props.flashMessage("You have successfully logged in.", "success")
                        props.login()
                        navigate('/')
                    })
                }
            })
    };

    return (
    <form onSubmit={handleSubmit}>
        <h3 className="text-center">Login</h3>
        <div className="row justify-content-center">
            <div className="form-group w-25">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" className="form-control" placeholder="Username" />
                <label htmlFor="Password">Password</label>
                <input type="password" name="password" className="form-control" placeholder="Password" />
                <input type="submit" className="btn btn-primary w-100 mt-2" value="Login" />
            </div>
        </div>
    </form>
    )
}
