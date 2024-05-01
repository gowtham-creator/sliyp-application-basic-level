import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import { Link } from 'react-router-dom';
import api from '../api'; // Import your API module
import '../css/UserList.css';

const UserList = () => {
    const authState = useSelector((state) => state.authReducer);
    const [users, setUsers] = useState([]);
    const [fetchData, { loading }] = useFetch();

    const fetchUsers = useCallback(() => {
        const config = {
            url: '/user/all', // Replace with your API endpoint
            method: 'get',
            headers: { Authorization: 'Bearer ' + authState.token },
        };

        fetchData(config, { showSuccessToast: false }).then((data) => setUsers(data));
    }, [authState.token, fetchData]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const [profileImages, setProfileImages] = useState({});

    const fetchProfileImages = async () => {
        const imageRequests = users.map(async (user) => {
            if (user.profileImgId) {
                const imageResp = await api.get(`/image/${user.profileImgId}`, {
                    headers: { Authorization: 'Bearer ' + authState.token },
                    responseType: 'arraybuffer',
                });

                if (imageResp.data && imageResp.data.byteLength > 0) {
                    const imageBytes = new Uint8Array(imageResp.data);
                    const base64String = btoa(
                        String.fromCharCode.apply(null, imageBytes)
                    );
                    return { userId: user.ref, base64Image: `data:image/jpeg;base64,${base64String}` };
                }
            }

            return { userId: user.ref, base64Image: null };
        });

        const images = await Promise.all(imageRequests);
        const imageMap = {};

        images.forEach((image) => {
            imageMap[image.userId] = image.base64Image;
        });

        setProfileImages(imageMap);
    };

    useEffect(() => {
        fetchProfileImages();
    }, [users, authState.token]);

    return (
        <div className="user-list">
            <h2><i className="fas fa-users"></i> User List</h2>
            {loading ? (
                <Loader />
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th><i className="fas fa-user"></i> Name</th>
                        <th><i className="fas fa-envelope"></i> Email</th>
                        <th><i className="fas fa-image"></i> Profile Image</th>
                        {/* Add more table headers for additional user properties */}
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.ref}>
                            <td>{user.ref}</td>
                            <td>
                                {/* Wrap the user name in a Link */}
                                <Link to={`/userprofile`}>{user.name}</Link>
                            </td>
                            <td>{user.email}</td>
                            <td>
                                {profileImages[user.ref] ? (
                                    <img
                                        src={profileImages[user.ref]}
                                        alt={`${user.name}'s Profile`}
                                        className="profile-image-small"
                                    />
                                ) : (
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                                        alt="Default Profile"
                                        className="profile-image-small"
                                    />
                                )}
                            </td>
                            {/* Add more table cells for additional user properties */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserList;
