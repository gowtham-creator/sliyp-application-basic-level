import React, { useState, useEffect } from 'react';
import api from '../api';
import PostCard from './PostCard';
import { useSelector } from 'react-redux';
import '../css/posts.css';
import CreatePost from './CreatePost';

function PostList() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const authState = useSelector((state) => state.authReducer);

    const fetchPosts = async (page) => {
        try {
            const response = await api.get(`/post?page=${page}&size=50`, {
                headers: { Authorization: 'Bearer ' + authState.token }
            });
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage, authState.token]);

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="post-list">
            <div className="post-card">
                <CreatePost />
            </div>
            {posts.map((post, index) => (
                <PostCard key={index} post={post} />
            ))}

            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 0}>
                    Previous
                </button>
                <span>Page {currentPage + 1}</span>
                <button onClick={nextPage}>Next</button>
            </div>
        </div>
    );
}

export default PostList;
