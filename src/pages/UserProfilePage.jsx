import React from 'react';
import UserProfile from '../components/UserProfile';
import {useSelector} from "react-redux"; // Import your UserProfile component

function UserProfilePage() {
    const authState = useSelector(state => state.authReducer);
    const specificEmail = authState.user.email

    return (
        <div>
            <h1>User Profile Page</h1>
            {/* Render UserProfile component with the specific email */}
            <UserProfile email={specificEmail} />
        </div>
    );
}

export default UserProfilePage;