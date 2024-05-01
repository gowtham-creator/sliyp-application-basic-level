import React, { useState, useEffect } from 'react';
import '../css/UserProfile.css';
import {useSelector} from "react-redux";
import api from "../api";

function UserProfile({ email }) {

    const [userProfile, setUserProfile] = useState(null);
    const authState = useSelector(state => state.authReducer);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get(`/user/profile`,
                    { headers: { Authorization: "Bearer " + authState.token } });
                const userProfileData = response.data;
                setUserProfile(userProfileData);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [email, authState.token]);
    if (!userProfile) {
        return <div>Loading...</div>;
    }

    const handleImageSelect = async (event) => {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append('file', file);
        formData.append('img-type','USER_PROFILE')

        const imageUploadResp= await api.post('image', formData,{headers: { Authorization: "Bearer " + authState.token ,
            "Content-Type": "multipart/form-data"
            },
            responseType: 'arraybuffer',}, { showSuccessToast: true });

        console.log(imageUploadResp);
    }

    return (
        <div className="user-profile">
            <div className="profile-header" onClick={() => document.getElementById('image-input').click()}>
                {userProfile.profileImgUrl ? (
                    <img src={userProfile.profileImgUrl} alt="Profile" className="profile-image" />
                ) : (
                    <img src= "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" alt="Default Profile" className="profile-image" />
                )}

                {/* Hidden input for selecting an image */}
                <input
                    type="file"
                    id="image-input"
                    accept="image/*"
                    onChange={handleImageSelect}
                    style={{ display: 'none' }}
                />

                <h2 className="profile-name">{userProfile.name}
                    <p className="profile-handle">@{userProfile.handle}</p>
                </h2>

            </div>
            <div className="profile-details">
                <div className="detail">
                    <span className="label">Email:</span>
                    <span className="value">{userProfile.email}</span>
                </div>
                <div className="detail">
                    <span className="label">Address:</span>
                    <span className="value">{userProfile.address}</span>
                </div>
                {/* Add more profile information as needed */}
            </div>
        </div>
    );
}

export default UserProfile;
