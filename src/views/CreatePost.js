import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreatePost(props) {
    let navigate = useNavigate();

    const base_url = props.base_url
    const handleSubmit = (e) => {
        e.preventDefault()
        let title = e.target.title.value; 
        let body  = e.target.body.value;
        let myToken = localStorage.getItem('token');

        // Create post call
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${myToken}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "title" : title,
            "content" : body
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${base_url}/blog/posts`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.error){
                    props.flashMessage(data.error, "danger")
                } else {
                    props.flashMessage(`Post ${title} has been created!`, "success")
                    navigate('/allposts')
                }
            })
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <h3 className="text-center">Create Post</h3>
            <div className="row justify-content-center">
                <div className="form-group w-50">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" className="form-control" placeholder="Title:" />
                    <label htmlFor="body">Body</label>
                    <input type="text" name="body" className="form-control" placeholder="Body:" />
                    <input type="submit" className="btn btn-primary w-100 mt-2" value="Create Post" />
                </div>
            </div>
        </form>
    )
}
