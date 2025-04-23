import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './specialcoupons.css';

const SpecialCoupons = () => {
  const [specialCoupons, setSpecialCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecialCoupons = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/couponall/user/special');
        setSpecialCoupons(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch special coupons.');
      } finally {
        setLoading(false);
      }
    };
    fetchSpecialCoupons();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await axios.delete(`http://localhost:5000/api/couponall/${id}`);
        setSpecialCoupons(specialCoupons.filter(coupon => coupon.id !== id));
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete coupon.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="special-coupons-container">
      <h1>Special Coupons</h1>
      {specialCoupons.length === 0 ? (
        <p>No special coupons available.</p>
      ) : (
        <ul className="coupons-list">
          {specialCoupons.map((coupon) => (
            <li key={coupon.id} className="coupon-item">
              <span>{coupon.name} (Code: {coupon.code}, {coupon.discount_percentage}% off)</span>
              <button
                className="btn-delete"
                onClick={() => handleDelete(coupon.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SpecialCoupons;