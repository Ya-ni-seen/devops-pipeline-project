import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TransactionDetail = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    // Fetch transaction details by ID (Replace with real API endpoint)
    async function fetchTransactionDetails() {
      try {
        const response = await fetch(`https://localhost:3001/transactions/transaction/${id}`);
        const data = await response.json();
        setTransaction(data);
      } catch (error) {
        console.error("Error fetching transaction details", error);
      }
    }

    fetchTransactionDetails();
  }, [id]);

  const handleVerify = async () => {
    // Mark transaction as verified and proceed with submission
    try {
      const response = await fetch(`https://localhost:3001/transactions/verify/${id}`, {
        method: 'POST',
      });
      if (response.ok) {
        alert("Transaction verified successfully!");
      } else {
        alert("Failed to verify transaction");
      }
    } catch (error) {
      console.error("Error verifying transaction", error);
    }
  };

  const handleSubmitToSWIFT = async () => {
    // Submit the verified transaction to SWIFT
    try {
      const response = await fetch(`https://localhost:3001/user/submit-to-swift/${id}`, {
        method: 'POST',
      });
      if (response.ok) {
        alert("Transaction submitted to SWIFT!");
      } else {
        alert("Failed to submit transaction to SWIFT");
      }
    } catch (error) {
      console.error("Error submitting transaction to SWIFT", error);
    }
  };

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h3>Transaction Details</h3>
      <div>
        <p><strong>Amount:</strong> {transaction.amount}</p>
        <p><strong>Currency:</strong> {transaction.currency}</p>
        <p><strong>Provider:</strong> {transaction.provider}</p>
        <p><strong>Account Number:</strong> {transaction.accountNumber}</p>
        <p><strong>SWIFT Code:</strong> {transaction.swiftCode}</p>
      </div>
      <button onClick={handleVerify} className="btn btn-success">Verify</button>
      <button onClick={handleSubmitToSWIFT} className="btn btn-danger" style={{ marginLeft: 10 }}>Submit to SWIFT</button>
    </div>
  );
};

export default TransactionDetail;
