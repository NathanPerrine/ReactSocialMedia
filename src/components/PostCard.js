import React from 'react'
import { Link } from 'react-router-dom'

export default function PostCard(props) {
    const post = props.post
    return (
        <div className="d-flex justify-content-center">
            <div className="card m-1 col-8">
                <h5 className="card-header">{ post.title }</h5>
                <div className="card-body">
                    {/* <h5 className="card-title">Special title treatment</h5> */}
                    <p className="card-text">{ post.content }</p>
                    {/* <a href=`${base_url}` className="stretched-link">View More</a> */}
                    <Link className="nav-link stretched-link" to={`/singlepost/${post.id}`}>View More</Link>
                </div>
                <div className="card-footer text-muted">
                    { post.author.username } - { post.date_created }

                </div>
            </div>
        </div>
    )
}
