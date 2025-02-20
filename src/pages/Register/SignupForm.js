import React, { useState, useEffect } from 'react';
import './Register.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    otp: '',
    password: '',
    confirmPassword: '',
    userType: '',
    schoolName: '',
    pinCode: '',
    city: '',
    state: '',
    address: '',
    employeeId: ''
  });

  const [seEmployeeIds, setSeEmployeeIds] = useState([]);
  const [schoolNames, setSchoolNames] = useState([]);
  const [loading, setLoading] = useState(false);     // For showing "Sending..." while sending OTP
  const [otpError, setOtpError] = useState('');      // For displaying any OTP-related errors
  const [otpSent, setOtpSent] = useState(false);

  // Fetch school names when the component mounts or when userType is 'student'
  useEffect(() => {
    if (formData.userType === 'student') {
      fetchSchoolNames();
    }
  }, [formData.userType]);

  const fetchSchoolNames = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/schools');
      const data = await response.json();
      setSchoolNames(data); // Store the fetched school names in state
    } catch (error) {
      console.error('Error fetching school names:', error);
    }
  };

  // const getSchoolsBySE = async (req, res) => {
  //   const { seId } = req.params;

  //   try {
  //     const [schools] = await db.promise().query(
  //       `SELECT DISTINCT s.school_name 
  //        FROM schools s
  //        INNER JOIN se_school_mappings sm ON s.id = sm.school_id
  //        WHERE sm.se_id = ?
  //        ORDER BY s.school_name`,
  //       [seId]
  //     );

  //     res.status(200).json(schools);
  //   } catch (error) {
  //     console.error('Error fetching schools for SE:', error);
  //     res.status(500).json({ error: 'Failed to fetch schools' });
  //   }
  // };

  // Fetch SE Employee IDs when the School radio button is selected
  useEffect(() => {
    if (formData.userType === 'school') {
      fetchSeEmployeeIds();
    }
  }, [formData.userType]);

  const fetchSeEmployeeIds = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/se-employees');
      const data = await response.json();
      setSeEmployeeIds(data);
    } catch (error) {
      console.error('Error fetching SE Employee IDs:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (e) => {
    setFormData({ ...formData, userType: e.target.value });
  };

  const fetchCityState = async () => {
    if (formData.pinCode.length === 6) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${formData.pinCode}`);
        const data = await response.json();

        if (data[0].Status === "Success") {
          const { District, State } = data[0].PostOffice[0];
          setFormData({ ...formData, city: District, state: State });
        } else {
          alert('Invalid Pin Code. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching city and state:', error);
        alert('Failed to fetch location. Please check the Pin Code.');
      }
    }
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setOtpError('');
      const response = await fetch('http://localhost:5000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        setOtpSent(true);
        alert('OTP sent to your email!');
      } else {
        const data = await response.json();
        setOtpError(data.message || 'Failed to send OTP.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setOtpError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });

      if (response.ok) {
        alert('OTP verified successfully!');
      } else {
        const data = await response.json();
        setOtpError(data.message || 'Invalid OTP.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('An error occurred. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          otp: '',
          password: '',
          confirmPassword: '',
          userType: '',
          schoolName: '',
          pinCode: '',
          city: '',
          state: '',
          address: '',
          employeeId: ''
        });
      } else {
        alert(data.error || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='body7813'>
      <h1 className='h113'>Create Account</h1>
      <form className='form-container13' onSubmit={handleSubmit}>
        <div>
          <label className='label13'>First Name</label>
          <input type="text" className='input13' name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label className='label13'>Last Name</label>
          <input type="text" className='input13' name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label className='label13'>Email</label>
          <input type="email" className='input13' name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label className='label13'>Mobile Number</label>
          <input type="text" className='input13' name="mobile" value={formData.mobile} onChange={handleChange} required />
        </div>
        <div>
          <label className='label13'>Enter OTP</label>
          <input
            className='input13'
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
          />
          <button type="button" className='button13' onClick={handleSendOtp} disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
          <button type="button" className='button13' onClick={handleVerifyOtp}>
            Verify OTP
          </button>
          {otpError && <p className="error-message">{otpError}</p>}
        </div>
        <div>
          <label className='label13'>Password</label>
          <input type="password" name="password" className='input13' value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label className='label13' >Confirm Password</label>
          <input type="password" className='input13' name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        <div>
          <label className='label13'>User Type</label>
          <div className='radio-group'>
            <label>
              <input type="radio" className='input13' name="userType" value="student" onChange={handleUserTypeChange} /> Student
            </label>
            <label>
              <input type="radio" className='input13' name="userType" value="school" onChange={handleUserTypeChange} /> School
            </label>
            <label>
              <input type="radio" className='input13' name="userType" value="se" onChange={handleUserTypeChange} /> SE
            </label>
            <label>
              <input type="radio" className='input13' name="userType" value="other" onChange={handleUserTypeChange} /> Other
            </label>
          </div>
        </div>


        {/* Conditional Fields */}
        {formData.userType === 'student' && (
          <div>
            <label>School Name</label>
            <select name="schoolName" value={formData.schoolName} onChange={handleChange}>
              <option value="">Select School</option>
              {schoolNames.map((school, index) => (
                <option key={index} value={school.school_name}>
                  {school.school_name}
                </option>
              ))}
            </select>
          </div>
        )}
        {formData.userType === 'se' && (
          <div>
            <label>Enter SE Employee ID</label>
            <input
              className='input13'
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Enter your Employee ID"
              required
            />
          </div>
        )}

        {formData.userType === 'school' && (
          <>
            <div>
              <label className='label13'>School Name</label>
              <input type="text" className='input13' name="schoolName" value={formData.schoolName} onChange={handleChange} />
            </div>
            <div>
              <label className='label13'>Pin Code</label>
              <input type="text" className='input13' name="pinCode" value={formData.pinCode} onChange={handleChange} onBlur={fetchCityState} />
            </div>
            <div>
              <label className='label13'>City</label>
              <input type="text" className='input13' name="city" value={formData.city} readOnly />
            </div>
            <div>
              <label className='label13'>State</label>
              <input type="text" className='input13' name="state" value={formData.state} readOnly />
            </div>
            <div>
              <label className='label13'>Address</label>
              <input type="text" className='input13' name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div>
              <label className='label13'>Select SE Employee ID</label>
              <select name="employeeId" value={formData.employeeId} onChange={handleChange}>
                <option value="">Select Employee ID</option>
                {seEmployeeIds.map((id, index) => (
                  <option key={index} value={id.employee_id}>
                    {id.employee_id}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div>
          <label className='label12'>
            <input type="checkbox" className='input12' required /> I agree to the Terms and Conditions.
          </label>
        </div>

        <button className='button13' type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;