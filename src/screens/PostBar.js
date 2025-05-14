import React, { useState } from 'react';
import './Friends.css';

function PostBar() {
    const [post, setPost] = useState('');
    const [posts, setPosts] = useState([]);

    const handlePost = (e) => {
        e.preventDefault();
        if (post.trim() !== '') {
            setPosts([{ text: post, date: new Date().toLocaleString() }, ...posts]);
            setPost('');
        }
    };

    return (
        <div className="postbar-container">
            <form onSubmit={handlePost} className="postbar-form">
                <input
                    type="text"
                    value={post}
                    onChange={e => setPost(e.target.value)}
                    placeholder="Write a course review..."
                    className="postbar-input"
                />
                <button type="submit" className="postbar-button">Post</button>
            </form>
            {posts.length > 0 && (
                <div className="postbar-list">
                    {posts.map((p, idx) => (
                        <div key={idx} className="postbar-post">
                            <div>{p.text}</div>
                            <div className="postbar-date">{p.date}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PostBar;