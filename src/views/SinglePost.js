import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function SinglePost(props) {
    const base_url = props.base_url
    const { postId } = useParams();
    const [post, setPost] = useState(null)
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

    return (
        
        <>
            { post ? 
                // <PostCard post={post} /> 
                <>
                <div className="row">
                    <div className="col-5 offset-1 border-end">
                        <h3 className="mt-3"><strong>{post.title}</strong></h3>
                        <p className="">{post.content}</p>
                        <p className="border-top">&mdash; {post.author.username} | {post.date_created}</p>
                    </div>


                </div>
                </>
            : null}
        </>
    
        )
}
