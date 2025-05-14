import React from 'react';
import ViewFriends from './ViewFriends';
import PostBar from './PostBar';
import './Friends.css';

function FriendsPage() {
    return (
        <div className="friends-bg">
            <ViewFriends />
            <PostBar />
        </div>
    );
}

export default FriendsPage;

import FriendsPage from './screens/FriendsPage';


<Route path="/friends" element={<FriendsPage />} />