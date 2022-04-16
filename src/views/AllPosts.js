import React, { useState, useEffect} from 'react'
import PostCard from '../components/PostCard';

export default function AllPosts(props) {   
    const [posts, setPosts] = useState([]);
    const base_url = props.base_url;
    // sorting methods

    //Grab all posts
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    useEffect(() => {
        fetch(`${base_url}/blog/posts`, requestOptions)
        .then(res => res.json())
        .then(data => setPosts(data))
    }, [])

    return (
        <>
            <h2 className="text-center">All Posts</h2>

            {posts.map(p => <PostCard post={p} key={p.id} base_url={base_url} />)}
        </>
    )
}
