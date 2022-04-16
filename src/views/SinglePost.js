import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SinglePost(props) {
    const base_url = props.base_url
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        fetch(`${base_url}/blog/posts/${postId}`)
            .then(res => res.json())
            .then(data => {
                if (data.error){props.flashMessage(data.error, "danger")}
                else {setPost(data)}
                })

    }, [postId])

    useEffect(() => {
        if (post !== null){
                //Check if the user logged in is the author 
                let myToken = localStorage.getItem('token')
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${myToken}`)
                
                var requestOptions={
                    method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }
            
            fetch(`${base_url}/auth/me`, requestOptions)
                .then(res => res.json())
                .then(data => { if (data.username === post.author.username ){ setCanEdit(true)} })
        }
    }, [post])

    const handleEditSubmit = (e) => {
        e.preventDefault()
        let title = e.target.title.value; 
        let body  = e.target.body.value;
        let myToken = localStorage.getItem('token');

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${myToken}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "title" : title,
            "content" : body 
        })

        var requestOptions = {
            method : 'PUT',
            headers : myHeaders,
            body : raw,
            redirect : 'follow'
        };

        fetch(`${base_url}/blog/posts/${postId}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.error) { props.flashMessage(data.error, "danger")}
                else {
                    props.flashMessage(`${data.title} has been updated.`, 'success')
                    setPost(data)
                }
            })
    }

    return (
        
        <>
            { post ? 
                // <PostCard post={post} /> 
                <>
                <div className="row">
                    <div className="col-5 offset-1 border-end">
                        <h3 className="mt-3"><strong>{post.title}</strong></h3>
                        <p className="">{post.content}</p>
                        <div className="footer border-top d-flex justify-content-between">
                            <p className="pt-3">&mdash; {post.author.username} | {post.date_created}</p>
                            
                            {canEdit ? <i className="fas fa-edit align-self-center btn" onClick={() => setEditMode(!editMode)} ></i> : null}
                        </div>
                    </div>

                    {editMode ? 
                    <>
                        <form onSubmit={handleEditSubmit} className="col-6">
                            <h3 className="text-center">Create Post</h3>
                            <div className="row justify-content-center">
                                <div className="form-group w-50">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" className="form-control" defaultValue={post.title} />
                                <label htmlFor="body">Body</label>
                                <textarea name="body" className="form-control" defaultValue={post.content} />
                                <input type="submit" className="btn btn-primary w-100 mt-2" value="Edit Post" />
                                </div>
                            </div>
                        </form>
                    </> : null}


                </div>
                </>
            : null}
        </>
    
        )
}
