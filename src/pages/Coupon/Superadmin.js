import React, { useState, useEffect } from "react";
import "./Superadmin.css";

const Superadmin = () => {
  const [schools, setSchools] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [generatedCoupon, setGeneratedCoupon] = useState(null);

  useEffect(() => {
    fetchSchools();
    fetchCoupons();
  }, []);

  useEffect(() => {
    console.log("Coupons in State:", coupons);
}, [coupons]);


  const fetchSchools = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/schools");
      const data = await response.json();
      setSchools(data);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  const fetchCoupons = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/coupons/all");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched Coupons:", data);  // Debugging
      setCoupons(data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
      setCoupons([]);
    }
  };




  const generateCoupon = async () => {
    if (!selectedSchool) {
      alert("Please select a school first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolId: selectedSchool }),
      });

      const data = await response.json();
      if (response.ok) {
        setGeneratedCoupon(data);
        fetchCoupons();
        alert("Coupon generated successfully!");
      } else {
        alert("Failed to generate coupon: " + data.error);
      }
    } catch (error) {
      console.error("Error generating coupon:", error);
      alert("An error occurred.");
    }
  };

  const sendCouponEmail = async () => {
    if (!generatedCoupon) {
      alert("Please generate a coupon first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/coupons/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          couponCode: generatedCoupon.schoolCode,
          studentCouponCode: generatedCoupon.studentCode,
          schoolId: selectedSchool,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Emails sent successfully!");
      } else {
        alert("Failed to send emails: " + data.error);
      }
    } catch (error) {
      console.error("Error sending emails:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="superadmin-container">
      <div className="section">
        <table>
          <thead>
            <tr>
              <th>SE Employee ID</th>
              <th>SE Name</th>
              <th>School Name</th>
              <th>School Coupon Code</th>
              <th>Student Coupon Code</th>
              <th>Discount %</th>
              <th>Valid From</th>
              <th>Valid Until</th>
              <th>Generation Date</th>
              <th>Uses</th>
            </tr>
          </thead>
          <tbody>
  {coupons.map((coupon, index) => (
    <tr key={coupon.coupon_id || index}>
      <td>{coupon.se_employee_id || "N/A"}</td>
      <td>{coupon.se_name || "N/A"}</td>
      <td>{coupon.school_name}</td>
      <td>{coupon.school_coupon_code || "No School Coupon"}</td>
      <td>{coupon.student_coupon_code || "No Student Coupon"}</td>
      <td>{coupon.discount_percentage}%</td>
      <td>{new Date(coupon.valid_from).toLocaleDateString()}</td>
      <td>{new Date(coupon.valid_until).toLocaleDateString()}</td>
      <td>{new Date(coupon.generation_date).toLocaleDateString()}</td>
      <td>{coupon.current_uses}/{coupon.max_uses}</td>
    </tr>
  ))}
</tbody>



        </table>
      </div>
    </div>
  );
};

export default Superadmin;
