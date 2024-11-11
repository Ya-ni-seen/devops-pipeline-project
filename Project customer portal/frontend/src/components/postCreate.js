import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function CreatePost() {
  const [form, setForm] = useState({
    content: "",
    image: "",
    user: "",
  });
  const navigate = useNavigate();

  // Retrieve the user from localStorage when the component mounts
  useEffect(() => {
    const savedUser = localStorage.getItem("name");
    if (savedUser) {
      setForm((prev) => ({
        ...prev,
        user: savedUser,
      }));
    } else {
      // Redirect to login if there's no user in localStorage
      navigate("/login");
    }
  }, [navigate]);

  // Update the form state
  function updateForm(value) {
    setForm((prev) => ({
      ...prev,
      ...value,
    }));
  }

  // Handle image file change (Convert image to Base64)
  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1];
          updateForm({ image: base64String });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        window.alert("Error reading image file.");
      }
    }
  }

  // Function to handle the form submission
  async function onSubmit(e) {
    e.preventDefault();
    const name = localStorage.getItem("name");
    const token = localStorage.getItem("jwt");  // Get JWT token from localStorage

    const newPost = {
        user: name,
        content: form.content,
        image: form.image,
    };

    try {
        const response = await fetch("https://localhost:3001/post/upload", {  // Ensure the URL is correct
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,  // Add JWT token to authorization header
            },
            body: JSON.stringify(newPost),
        });

        // Check if response status is ok before parsing
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const responseText = await response.text(); // Read the raw response text
        console.log("Server response:", responseText); // Log the response

        let data;
        // Check if the response is JSON
        if (response.headers.get("Content-Type").includes("application/json")) {
            data = JSON.parse(responseText);  // Parse the response as JSON
            console.log("Parsed response:", data);  // Log the parsed response
        } else {
            console.log("Unexpected response format:", responseText);
            throw new Error("Unexpected response format");
        }

        // Optionally, redirect or show success message
        window.alert("Post created successfully!");
        navigate("/");  // Redirect to the home page after successful post creation
    } catch (error) {
        window.alert("Error creating post: " + error.message);
    }
}



  return (
    <div className="container">
      <h3>Create a Post</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            className="form-control"
            id="content"
            rows="3"
            value={form.content}
            onChange={(e) => updateForm({ content: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Post
        </button>
      </form>
    </div>
  );
}
