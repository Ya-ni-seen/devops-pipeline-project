import React, { useEffect, useState } from "react";
import "../App.css"; // Corrected the import statement

// Post component to display individual posts
const Post = (props) => (
  <tr>
    <td>{props.post.user}</td>
    <td>{props.post.content}</td>
    <td>
      {props.post.image && (
        <img
        src={`data:image/jpeg;base64,${props.post.image}`}
        alt="Post content"
        style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
       />      
      )}
    </td>
    <td>
      <button
        className="btn btn-link"
        onClick={() => props.deletePost(props.post._id)} // Corrected the onClick handler
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function PostList() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the database
  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch("https://localhost:3001/post/");
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Posts fetched:", data); // Check the structure of the data
        setPosts(data); // Update state with posts
      } catch (error) {
        window.alert(error.message);
      }
    }
    getPosts();
  }, []);

  // Delete post handler (this should send a delete request to the server)
  const deletePost = async (id) => {
    try {
      const response = await fetch(`https://localhost:3001/post/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete post: ${response.statusText}`);
      }
      // Update the posts list by removing the deleted post
      setPosts(posts.filter(post => post._id !== id));
    } catch (error) {
      window.alert(error.message); // Display error message in case of failure
    }
  };

  return (
    <div className="container">
      <h3 className="header">Apds Notice Board</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Content</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Post key={post._id} post={post} deletePost={deletePost} />
            ))
          ) : (
            <tr>
              <td colSpan="4">No posts available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
