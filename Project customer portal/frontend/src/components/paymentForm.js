import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    currency: 'USD',
    provider: 'SWIFT',
    accountNumber: '',
    swiftCode: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send payment details to the backend (Replace with real API endpoint)
    try {
      const response = await fetch("https://localhost:3001/payment/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentDetails),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Payment initiated successfully!");
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        alert(result.message || "Failed to initiate payment.");
      }
    } catch (error) {
      console.error("Error submitting payment", error);
    }
  };

  return (
    <div className="container">
      <h3>Initiate Payment</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={paymentDetails.amount}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Currency</label>
          <select
            name="currency"
            value={paymentDetails.currency}
            onChange={handleChange}
            className="form-control"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            {/* Add more currencies here */}
          </select>
        </div>
        <div className="form-group">
          <label>Provider</label>
          <input
            type="text"
            name="provider"
            value={paymentDetails.provider}
            onChange={handleChange}
            className="form-control"
            disabled
          />
        </div>
        <div className="form-group">
          <label>Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={paymentDetails.accountNumber}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>SWIFT Code</label>
          <input
            type="text"
            name="swiftCode"
            value={paymentDetails.swiftCode}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
