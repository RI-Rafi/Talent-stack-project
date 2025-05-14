
import { useState, useEffect } from "react";
import { db } from "../firebase"; 
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

function PostPage() {
  const [courseLink, setCourseLink] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [posts, setPosts] = useState([]);

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, "Posts"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    };
    fetchPosts();
  }, []);

  // Add new post
  const handlePost = async () => {
    if (!courseLink || !description) {
      alert("Course link and description");
      return;
    }

    await addDoc(collection(db, "Posts"), {
      courseLink,
      description,
      comments: comment ? [comment] : [],
      postedAt: serverTimestamp()
    });

    setCourseLink("");
    setDescription("");
    setComment("");
    alert("Post is successfull!");

    // Refresh posts
    const snapshot = await getDocs(collection(db, "Posts"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(data);
  };

  return (
    <div style={{ padding: "20px", maxWidth: 600, margin: "0 auto" }}>
      <h2>New Course Post</h2>
      <input
        type="text"
        placeholder="Course Link"
        value={courseLink}
        onChange={(e) => setCourseLink(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />
      <textarea
        placeholder="Course Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", width: "100%", height: "80px", marginBottom: "10px" }}
      />
      <input
        type="text"
        placeholder="Comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handlePost}>Post</button>

      <hr style={{ margin: "30px 0" }} />

      <h2>All Posts</h2>
      {posts.map(post => (
        <div key={post.id} style={{ border: "1px solid #ccc", marginBottom: "15px", padding: "10px", borderRadius: "8px", background: "#fff" }}>
          <p><strong>Link:</strong> <a href={post.courseLink} target="_blank" rel="noreferrer">{post.courseLink}</a></p>
          <p><strong>Description:</strong> {post.description}</p>
          <p><strong>Comments:</strong> {post.comments?.join(", ") || "No comments"}</p>
        </div>
      ))}
    </div>
  );
}

export default PostPage;

import PostPage from './screens/PostPage';

<Route path="/posts" element={<PostPage />} />