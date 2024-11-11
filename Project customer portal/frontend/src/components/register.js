import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    idNumber: "",
    accountNumber: "",
    password: "",
  });
  const navigate = useNavigate();

  // This method will update the state properties
  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Client-side validation for ID and account number
  const validateInput = () => {
    const { idNumber, accountNumber, password } = form;
    const idRegex = /^[0-9]{13}$/; // Example format: 13-digit South African ID number
    const accountRegex = /^[0-9]{10,12}$/; // Example format: 10-12 digit account number
    const passwordStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!idRegex.test(idNumber)) {
      alert("Invalid ID Number format. Please enter a 13-digit ID number.");
      return false;
    }
    if (!accountRegex.test(accountNumber)) {
      alert("Invalid Account Number format. Please enter a 10-12 digit account number.");
      return false;
    }
    if (!passwordStrong.test(password)) {
      alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      return false;
    }
    return true;
  };

  // This function will handle the submission
  async function onSubmit(e) {
    e.preventDefault();

    if (!validateInput()) return;

    const newCustomer = { ...form };

    try {
      const response = await fetch("https://localhost:3001/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      });

      const { message } = await response.json();

      if (response.ok) {
        alert(message);
        setForm({ name: "", idNumber: "", accountNumber: "", password: "" }); // Reset form after success
        navigate("/"); // Navigate to homepage or login
      } else {
        alert(`Registration failed: ${message}`);
      }
    } catch (err) {
      console.error("An error occurred:", err);
      alert("Registration failed. Please try again later.");
    }
  }

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
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
          <label htmlFor="idNumber">ID Number:</label>
          <input
            type="text"
            className="form-control"
            id="idNumber"
            value={form.idNumber}
            onChange={(e) => updateForm({ idNumber: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="accountNumber">Account Number:</label>
          <input
            type="text"
            className="form-control"
            id="accountNumber"
            value={form.accountNumber}
            onChange={(e) => updateForm({ accountNumber: e.target.value })}
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
          Register
        </button>
      </form>
    </div>
  );
}
