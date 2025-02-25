import React, { useState, useEffect } from 'react';
import { Calendar,Mail } from 'lucide-react';
import './CouponGenerator.css';  // External CSS file

const CouponGenerator = () => {
  const [seEmployees, setSEEmployees] = useState([]);
  const [schools, setSchools] = useState([]);
  const [selectedSE, setSelectedSE] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [generatedCoupon, setGeneratedCoupon] = useState(null);
  const [emailStatus, setEmailStatus] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    fetchSEEmployees();
  }, []);

  useEffect(() => {
    if (selectedSE) {
      fetchSchools(selectedSE);
    } else {
      setSchools([]);
    }
  }, [selectedSE]);

  const fetchSEEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/se-employees');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setSEEmployees(data);
    } catch {
      setError('Failed to load SE employees');
    }
  };

  const fetchSchools = async (seId) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`http://localhost:5000/api/schools-by-se/${seId}`);
      const data = await response.json();
      if (response.ok) setSchools(data);
      else setError(data.error || 'Failed to load schools');
    } catch {
      setError('Network error while loading schools');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    setGeneratedCoupon(null);

    try {
      const response = await fetch('http://localhost:5000/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolId: parseInt(selectedSchool),
          seEmployeeId: selectedSE,
          discountPercentage: parseFloat(discountAmount),  // Change from discountAmount to discountPercentage
          validFrom,
          validUntil,
          maxUses: 50
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Coupon generated successfully!');
        setGeneratedCoupon({
          ...data,
          schoolId: parseInt(selectedSchool),
          seEmployeeId: selectedSE,
          discountPercentage: parseFloat(discountAmount),
          validFrom,
          validUntil
      });
    }else {
        setError(data.error || 'Failed to generate coupon');
      }
    } catch {
      setError('Error generating coupon');
    } finally {
      setLoading(false);
    }
  };
  // const handleSendEmail = async () => {
  //   if (!generatedCoupon) return;

  //   setSendingEmail(true);
  //   setEmailStatus('');
  //   setError('');

  //    try {

  //     const emailData = {
  //       couponCode: generatedCoupon.couponCode,
  //       schoolId: selectedSchool,
  //       seEmployeeId: selectedSE
  //     };

  //     console.log('Sending email data:', emailData); // Debug log

  //     const response = await fetch('http://localhost:5000/api/coupons/send-email', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(emailData),
  //     });

  //     const data = await response.json();
  //     console.log('Response:', data);  // Add this line
      
  //     if (response.ok) {
  //       setEmailStatus('Email sent successfully!');
  //       // Now reset the form
  //       setSelectedSchool('');
  //       setDiscountAmount('');
  //       setValidFrom('');
  //       setValidUntil('');
  //       setGeneratedCoupon(null);
  //     } else {
  //       setError(data.error || 'Failed to send email');
  //     }
  //   } catch (error) {
  //     console.error('Email sending error:', error);
  //     setError('Error sending email');
  //   } finally {
  //     setSendingEmail(false);
  //   }
  // };


  const handleSendEmail = async () => {
    if (!generatedCoupon) return;
  
    setSendingEmail(true);
    setEmailStatus('');
    setError('');
  
    try {
      const emailData = {
        couponCode: generatedCoupon.couponCode,  // Ensure this exists
        schoolId: generatedCoupon.schoolId,
        seEmployeeId: generatedCoupon.seEmployeeId,
        discountPercentage: generatedCoupon.discountPercentage,
        validFrom: generatedCoupon.validFrom,
        validUntil: generatedCoupon.validUntil
      };
  
      console.log('Sending email data:', emailData); // Debug log
  
      const response = await fetch('http://localhost:5000/api/coupons/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
      });
  
      const data = await response.json();
      console.log('Response:', data);  // Debugging log
  
      
      if (response.ok) {
        setEmailStatus('Email sent successfully!');
        // Clear form after successful email
        setSelectedSchool('');
        setDiscountAmount('');
        setValidFrom('');
        setValidUntil('');
        setGeneratedCoupon(null);
      }  else {
        setError(data.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      setError('Error sending email');
    } finally {
      setSendingEmail(false);
    }
  };
  

  return (
    <div className="coupon-generator">
      <h2 className="title">Generate School Coupon</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="form">

      <div className="button-group">
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={loading || !selectedSchool}
          >
            {loading ? 'Processing...' : 'Generate Coupon'}
          </button>

          {generatedCoupon && (
            <button
              type="button"
              className="email-btn"
              onClick={handleSendEmail}
              disabled={sendingEmail}
            >
              <Mail size={16} />
              {sendingEmail ? 'Sending...' : 'Send Email'}
            </button>
          )}
        </div>

        {message && <div className="success-message">{message}</div>}
        
        {generatedCoupon && (
          <div className="coupon-details">
            <h3>Generated Coupon Details</h3>
            <p><strong>Coupon Code:</strong> {generatedCoupon.couponCode}</p>
            <p><strong>Recipients:</strong></p>
            <ul>
              <li>School: {generatedCoupon.recipients.school_email}</li>
              <li>SE: {generatedCoupon.recipients.se_email}</li>
            </ul>
          </div>
        )}
      

        <div className="form-group">
          <label>Select SE Employee</label>
          <select value={selectedSE} onChange={(e) => setSelectedSE(e.target.value)} required>
            <option value="">Select SE Employee</option>
            {seEmployees.map((se) => (
              <option key={se.employee_id} value={se.employee_id}>
                {se.employee_id}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select School</label>
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            required
            disabled={!selectedSE || loading}
          >
            <option value="">{loading ? 'Loading schools...' : 'Select School'}</option>
            {schools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.school_name} {school.city ? `- ${school.city}` : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Discount Amount (%)</label>
          <input
            type="number"
            value={discountAmount}
            onChange={(e) => setDiscountAmount(e.target.value)}
            required
            min="0"
            max="100"
          />
        </div>

        <div className="form-group date-group">
          <div>
            <label>Valid From</label>
            <input
              type="date"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
            />
            <Calendar className="calendar-icon" size={20} />
          </div>

          <div>
            <label>Valid Until</label>
            <input
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              required
              min={validFrom || new Date().toISOString().split('T')[0]}
            />
            <Calendar className="calendar-icon" size={20} />
          </div>
        </div>

      </form>
    </div>
  );
};

export default CouponGenerator;