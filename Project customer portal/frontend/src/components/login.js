import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Corrected the import

export default function Login() {
  const [form, setForm] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  // This method will update the state properties
  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the form submission
  async function onSubmit(e) {
    e.preventDefault();

    const newPerson = { ...form };

    // Send a POST request to the login endpoint
    const response = await fetch("https://localhost:3001/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
      .catch((error) => {
        window.alert("An error occurred: " + error);
        return;
      });

    if (response) {
      const data = await response.json();
      const { token, name } = data;
      console.log(name, token);

      // Save the JWT to localStorage
      localStorage.setItem("jwt", token);

      // Optionally, save the username if needed
      localStorage.setItem("name", name);

      // Reset form state
      setForm({ name: "", password: "" });

      // Navigate to a different page after successful login
      navigate("/");
    }
  }

  return (
    <div className="container">
      <h3>Login</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}