import React, { useState, useEffect } from 'react';
import './Alluser.css';

const Alluser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container13">
      <div className="header13">
        <h2 className="title13">All Users</h2>
        <div className="searchContainer13">
          <input
            type="text"
            placeholder="Search users..."
            className="searchInput13"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="table13">
        <div className="tableHeader13">
          <div>Name</div>
          <div>Email</div>
          <div>Mobile</div>
          <div>Role</div>
          <div>School Name</div>
          <div>SE ID</div>
        </div>

        <div className="tableBody13">
          {loading ? (
            // Loading skeleton
            [...Array(5)].map((_, idx) => (
              <div key={idx} className="tableRow13 skeleton-row">
                <div className="skeleton"></div>
                <div className="skeleton"></div>
                <div className="skeleton"></div>
                <div className="skeleton"></div>
                <div className="skeleton"></div>
                <div className="skeleton"></div>
              </div>
            ))
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div key={user.id} className="tableRow13">
                <div>{user.full_name}</div>
                <div>{user.email}</div>
                <div>{user.mobile}</div>
                <div>
                  <span className="role-badge">{user.role}</span>
                </div>
                <div>{user.school_name || '-'}</div>
                <div>{user.se_employee_id || '-'}</div>
              </div>
            ))
          ) : (
            <div className="no-data">No users found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alluser;