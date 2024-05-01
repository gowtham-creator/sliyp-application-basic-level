import React, { useState, useEffect } from 'react';
import '../css/CreatePost.css';
import { useSelector } from 'react-redux';
import api from '../api';

function CreatePost() {
    const [post, setPost] = useState({
        writeUp: '',
        imageUrl: '',
    });

    const authState = useSelector((state) => state.authReducer);
    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    useEffect(() => {
        // When the imageUrl changes, send the POST request if both writeUp and imageUrl are available
        if (post.imageUrl && post.writeUp) {
            createPost();
        }
    }, [post.imageUrl]);

    const createPost = async () => {
        try {
            // Send a POST request to your API endpoint to create the post
            const response = await api.post('/post', post, {
                headers: {
                    Authorization: 'Bearer ' + authState.token,
                },
            });

            if (response.ok) {
                console.log('Post created successfully.');
                // Clear the input fields or perform any other necessary actions
                setPost({
                    writeUp: '',
                    imageUrl: '',
                });
            } else {
                console.error('Failed to create post.');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);
                formData.append('img-type', 'OTHER');

                // Upload the image and get the image ID
                const imageUploadResp = await api.post('/image', formData, {
                    headers: {
                        Authorization: 'Bearer ' + authState.token,
                        "Content-Type":"multipart/form-data"
                    },
                    responseType: 'json',
                });

                if (imageUploadResp.status === 200) {
                    const imageId = imageUploadResp.data.id;
                    console.log(imageId);

                    // Set the image URL in the post data
                    setPost({
                        ...post,
                        imageUrl: imageId,
                    });
                }
            }

            // If no image is selected, send the POST request without imageUrl
            if (!imageFile && post.writeUp) {
                createPost();
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="create-post-container">
            <h2 className="create-post-title">Create a New Post</h2>
            <form className="create-post-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="writeUp">Write-up:</label>
                    <textarea
                        id="writeUp"
                        name="writeUp"
                        value={post.writeUp}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="imageFile">Image Upload (optional):</label>
                    <input
                        type="file"
                        id="imageFile"
                        name="imageFile"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
}

export default CreatePost;
