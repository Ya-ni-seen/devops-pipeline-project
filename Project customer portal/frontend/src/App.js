import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import PostList from "./components/postList";
import EditPost from "./components/postEdit";
import CreatePost from "./components/postCreate";
import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import PaymentForm from "./components/paymentForm";
import Transactions from "./components/transactions";
import TransactionDetail from "./components/transactionDetail";
import UserProfile from "./components/userProfile";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<PostList />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/:id" element={<TransactionDetail />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
};

export default App;
