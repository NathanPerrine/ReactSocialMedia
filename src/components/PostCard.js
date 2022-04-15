import React from 'react'

export default function PostCard(props) {
    const post = props.post
    console.log(post)
    return (
        <row className="d-flex justify-content-center">
            <div className="card m-1 col-6">
                <h5 className="card-header">{ post.title }</h5>
                <div className="card-body">
                    {/* <h5 className="card-title">Special title treatment</h5> */}
                    <p className="card-text">{ post.content }</p>
                </div>
                <div className="card-footer text-muted">
                    { post.author.username } - { post.date_created }
                </div>
            </div>
        </row>
    )
}
