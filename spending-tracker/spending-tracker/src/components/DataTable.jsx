import React, { useState, useRef, useEffect } from "react";
import categories from '../data/category.json';
import './DataTable.css';

// components/DataTable.jsx
export default function DataTable({ data, onDelete }) {
  const getCategoryDisplay = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? `${category.icon} ${category.name}` : categoryId;
  };

  if (!data || data.length === 0) {
    return (
      <div className="table-container">
        <div className="empty-state">
          No spending records found. Add some expenses to see them here!
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Date</th>
            <th>Amount (฿)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(record => (
            <tr key={record.id}>
              <td className="category-cell">{getCategoryDisplay(record.category)}</td>
              <td className="date-cell">{record.date}</td>
              <td className="amount-cell">{record.amount.toLocaleString()}</td>
              <td className="actions-cell">
                <button 
                  className="delete-button"
                  onClick={() => onDelete(record.id)}
                  aria-label={`Delete expense for ${getCategoryDisplay(record.category)}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
