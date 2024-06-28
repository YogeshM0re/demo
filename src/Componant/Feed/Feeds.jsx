import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Feeds.css";

const Feeds = () => {
  const [postText, setPostText] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("User ID not found in local storage");
    }
  }, []);

  const handlePost = async () => {
    try {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        console.error("User ID not found in local storage");
        toast.error("Please log in first", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const wordsCount = postText.trim().split(/\s+/).length;
      if (wordsCount < 2) {
        toast.error("Post should contain at least two words", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const response = await axios.post("http://localhost:4000/api/posts", {
        userId: storedUserId,
        text: postText,
      });
      console.log(response.data);
      toast.success("Post created successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setPostText("");
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  const handleViewMyPosts = () => {
    navigate("/viewposts");
  };

  const handleViewOtherPosts = () => {
     console.log("View other posts not implemented yet");
  };

  return (
    <div className="feeds-container animated">
      <h2 className="feeds-heading">Feeds</h2>
      <div className="textarea-container">
        <textarea
          placeholder="Write your post..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        ></textarea>
      </div>{" "}
      <div className="button-container">
        <button className="post-button" onClick={handlePost}>
          Post
        </button>

        <button className="view-my-posts" onClick={handleViewMyPosts}>
          View My Posts
        </button>
        <button className="view-other-posts" onClick={handleViewOtherPosts}>
          View Other Users' Posts
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Feeds;
