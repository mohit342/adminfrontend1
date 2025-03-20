import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SEGeneratedCoupons.css"; // Add CSS styling

const SEGeneratedCoupons = () => {
  const [seCoupons, setSeCoupons] = useState([]);

  useEffect(() => {
    fetchSEGeneratedCoupons();
  }, []);

  const fetchSEGeneratedCoupons = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/se-generated-coupons");
      setSeCoupons(response.data);
    } catch (error) {
      console.error("Error fetching SE generated coupons:", error);
    }
  };

  return (
    <div className="se-coupons-container">
      <h2>SE Generated Coupons</h2>
      <table className="se-coupons-table">
        <thead>
          <tr>
            <th>SE ID</th>
            <th>School Name</th>
            <th>School Coupon</th>
            <th>Student Coupon</th>
            <th>Generation Date</th>
            <th>Max Uses</th>
          </tr>
        </thead>
        <tbody>
          {seCoupons.length > 0 ? (
            seCoupons.map((se, index) => (
              <tr key={index}>
                <td>{se.se_id || "N/A"}</td>
                <td>{se.school_name}</td>
                <td>{se.school_coupon_code || "Not Generated"}</td>
                <td>{se.student_coupon_code || "Not Generated"}</td>
                <td>{new Date(se.generation_date).toLocaleDateString()}</td>
                <td>{se.max_uses || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SEGeneratedCoupons;