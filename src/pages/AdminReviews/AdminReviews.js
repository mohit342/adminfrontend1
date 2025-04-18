import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminReviews.css";

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editReview, setEditReview] = useState(null);
  const [editForm, setEditForm] = useState({ rating: 0, comment: "" });

  const fetchAllReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reviews/all");
      setReviews(response.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to fetch reviews.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const handleEdit = (review) => {
    setEditReview(review);
    setEditForm({ rating: review.rating, comment: review.comment });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editForm.rating < 1 || editForm.rating > 5 || !editForm.comment.trim()) {
      alert("Please provide a valid rating (1-5) and a non-empty comment.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/reviews/${editReview.id}`, editForm);
      setReviews(reviews.map((r) => (r.id === editReview.id ? response.data.data : r)));
      setEditReview(null);
      alert("Review updated successfully!");
    } catch (err) {
      console.error("Error updating review:", err);
      alert("Failed to update review.");
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`);
      setReviews(reviews.filter((r) => r.id !== reviewId));
      alert("Review deleted successfully!");
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review.");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-reviews-container">
      <h1 className="title">Manage Reviews</h1>
      <div className="table-wrapper">
        <table className="reviews-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Product ID</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.username}</td>
                <td>{review.product_id}</td>
                <td>{review.rating}</td>
                <td>{review.comment}</td>
                <td>{new Date(review.created_at).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleEdit(review)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editReview && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Edit Review</h2>
            <form onSubmit={handleUpdate} className="edit-form">
              <div className="form-group">
                <label className="form-label">Rating (1-5):</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={editForm.rating}
                  onChange={(e) => setEditForm({ ...editForm, rating: parseInt(e.target.value) })}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Comment:</label>
                <textarea
                  value={editForm.comment}
                  onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                  className="form-textarea"
                  required
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setEditReview(null)}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button type="submit" className="update-button">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminReviews;