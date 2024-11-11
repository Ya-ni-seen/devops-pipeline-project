import React from "react";
import logo from "../logo.svg"; // Ensure the path to your logo file is correct
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        <img className="img-fluid" src={logo} alt="logo" style={{ width: "25%" }} />
      </NavLink>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/create">
              Create Post
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          {/* Customer Dashboard */}
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>
          </li>
          {/* Initiate Payment Form */}
          <li className="nav-item">
            <NavLink className="nav-link" to="/payment">
              Make Payment
            </NavLink>
          </li>
          {/* Employee Transactions Page */}
          <li className="nav-item">
            <NavLink className="nav-link" to="/transactions">
              Transactions
            </NavLink>
          </li>
          {/* User Profile */}
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
