import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch all transactions from the server (Replace with real API endpoint)
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

  return (
    <div className="container">
      <h3>Transactions</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Provider</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.customerName}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.currency}</td>
                <td>{transaction.provider}</td>
                <td>{transaction.status}</td>
                <td>
                  <Link to={`/transaction/${transaction.id}`} className="btn btn-info">
                    View Details
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
