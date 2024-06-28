import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const userRole = localStorage.getItem("userRole");

      if (!userId || !userRole) {
        console.error("User ID or role not found in localStorage.");
        return;
      }

      const response = await axios.get("http://localhost:4000/api/posts", {
        params: {
          userId: userId,
          role: userRole,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await axios.delete(
          `http://localhost:4000/api/posts/${postId}`
        );
        console.log("Post deleted successfully:", response.data);
        fetchPosts();
      } catch (error) {
        console.error("Error deleting post:", error.message);
      }
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <h3>
              {"User Id: "}
              {post.user_id}
            </h3>
            <p>
              {"Post: "}
              {post.text}
            </p>
            <p>
              {"Date: "}
              {formatDate(post.created_at)}
            </p>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
