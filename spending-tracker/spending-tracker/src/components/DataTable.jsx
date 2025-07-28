import React, { useState, useRef, useEffect } from "react";
import categories from '../data/category.json';

// components/DataTable.jsx
export default function DataTable({ data, onDelete }) {
  const getCategoryDisplay = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? `${category.icon} ${category.name}` : categoryId;
  };

  return (
    <table border="1" cellPadding="5">
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
            <td>{getCategoryDisplay(record.category)}</td>
            <td>{record.date}</td>
            <td>{record.amount}</td>
            <td>
              <button onClick={() => onDelete(record.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
