import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewPosts.css";

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/posts/${userId}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const deletePost = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:4000/api/posts/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  return (
    <div>
      <h2>View Posts</h2>
      <div>
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <p className="post-content">Post: {post.text}</p>
            <div className="post-footer">
              <div className="post-date">
                Date: {formatDate(post.created_at)}
              </div>
              <div className="post-actions">
                <button>Edit</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={() => window.history.back()}>
        Back to Post Feed
      </button>
    </div>
  );
};

export default ViewPosts;
