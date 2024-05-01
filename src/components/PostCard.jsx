import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShare, faComment } from '@fortawesome/free-solid-svg-icons';
import '../css/posts.css';


function PostCard({ post }) {

    return (
        <div className="post-card">
            <div className="post-header">
                <div className="user-info">
                    {post.AuthorProfileImgUrl ?
                        (<img
                        src={post.AuthorProfileImgUrl}
                        alt={`shashi's Icon`}
                        className="profile-image-small"
                    />): (<img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                        alt={`shashi's Icon`}
                        className="profile-image-small"
                    />)}
                    <div className="user-details">
                        <h2 className="user-name">{post.AuthorName}</h2>
                        <p className="user-handle">@{post.AuthorHandle}</p>
                    </div>
                </div>
            </div>
            <div className="post-content">
                <p>{post.writeUp}</p>
                {post.post && (
                    <img src={post.imageUrl} alt="Post" className="post-image" />
                )}
                {/* Display other post details as needed */}
            </div>
            <div className="post-actions">
                <button>
                    <FontAwesomeIcon icon={faThumbsUp} /> Like
                </button>
                <button>
                    <FontAwesomeIcon icon={faComment} /> Comment
                </button>
                <button>
                    <FontAwesomeIcon icon={faShare} /> Share
                </button>
            </div>
        </div>
    );
}

export default PostCard;
