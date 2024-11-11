import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the customer transactions from the server (Replace with real API endpoint)
    async function fetchTransactions() {
      try {
        const response = await fetch("https://localhost:3001/transactions/transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    }

    fetchTransactions();
  }, []);

  const handleNewPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="container">
      <h3>Welcome to Your Dashboard</h3>
      <button className="btn btn-primary" onClick={handleNewPayment}>Initiate New Payment</button>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Currency</th>
            <th>Provider</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.amount}</td>
                <td>{transaction.currency}</td>
                <td>{transaction.provider}</td>
                <td>{transaction.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
