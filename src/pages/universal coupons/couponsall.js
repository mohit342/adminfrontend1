import React, { useState } from 'react';
import axios from 'axios';
import './couponsall.css';

const CouponsAll = () => {
  const [couponData, setCouponData] = useState({
    name: '',
    discount_percentage: '',
    valid_from: '',
    valid_until: '',
    max_uses: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
        const response = await axios.post('http://localhost:5000/api/couponall/create', {
          name: couponData.name,
          discount_percentage: parseFloat(couponData.discount_percentage),
          valid_from: couponData.valid_from,
          valid_until: couponData.valid_until,
          max_uses: parseInt(couponData.max_uses),
        });
        setSuccess(`Coupon "${response.data.name}" created with code: ${response.data.code}`);
        setCouponData({
          name: '',
          discount_percentage: '',
          valid_from: '',
          valid_until: '',
          max_uses: '',
        });
    } catch (err) {
        setError(err.response?.data?.error || 'Failed to create coupon. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="coupons-all-container">
      <h1>Create New Coupon</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit} className="coupon-form">
        <div className="form-group">
          <label htmlFor="name">Coupon Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={couponData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="discount_percentage">Discount Percentage (%)</label>
          <input
            type="number"
            id="discount_percentage"
            name="discount_percentage"
            value={couponData.discount_percentage}
            onChange={handleChange}
            min="1"
            max="100"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="valid_from">Valid From</label>
          <input
            type="date"
            id="valid_from"
            name="valid_from"
            value={couponData.valid_from}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="valid_until">Valid Until</label>
          <input
            type="date"
            id="valid_until"
            name="valid_until"
            value={couponData.valid_until}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="max_uses">Max Uses</label>
          <input
            type="number"
            id="max_uses"
            name="max_uses"
            value={couponData.max_uses}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Coupon'}
        </button>
      </form>
    </div>
  );
};

export default CouponsAll;