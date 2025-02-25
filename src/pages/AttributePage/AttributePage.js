import React, { useState, useEffect } from "react";
import "./AttributePage.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const AttributesList = () => {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch attributes when component mounts
  useEffect(() => {
    fetchAttributes();
  }, []);

  // Function to fetch attributes from backend
  const fetchAttributes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/attributes');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAttributes(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching attributes:', error);
      setError('Failed to load attributes. Please try again later.');
      setLoading(false);
    }
  };

  // Function to handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this attribute?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/attributes/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Refresh the attributes list after deletion
        fetchAttributes();
      } catch (error) {
        console.error('Error deleting attribute:', error);
        setError('Failed to delete attribute. Please try again.');
      }
    }
  };

  // Function to view attribute details
  const handleView = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/attributes/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      alert(`Category: ${data.data.category}\nValue: ${data.data.value}`);
    } catch (error) {
      console.error('Error viewing attribute:', error);
      setError('Failed to view attribute details.');
    }
  };

  if (loading) {
    return <div className="loading">Loading attributes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="attributes-container50">
      <h2 className="title">Attributes List</h2>
      {attributes.length === 0 ? (
        <p className="no-attributes">No attributes found. Please add some attributes.</p>
      ) : (
        <table className="attributes-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((attr) => (
              <tr key={attr.id}>
                <td>{attr.category}</td>
                <td>{attr.value}</td>
                <td className="actions">
                  <FaEye 
                    className="icon view" 
                    title="View" 
                    onClick={() => handleView(attr.id)}
                  />
                  <FaEdit 
                    className="icon edit" 
                    title="Edit" 
                    onClick={() => window.location.href = `/edit-attribute/${attr.id}`}
                  />
                  <FaTrash 
                    className="icon delete" 
                    title="Delete" 
                    onClick={() => handleDelete(attr.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttributesList;