import React, { useState } from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import './Alluser.css';

const Alluser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Kristin',
      role:'SE',
      phone: '9765241837',
      email: 'kristin@gmail.com',
      address:'b124,mittsure,jaipur',
      joiningDate:'24-02-2024',
      
    },
    {
        id: 1,
        name: 'Prerna',
        role:'School',
        phone: '7896541236',
        email: 'prerna@gmail.com',
        address:'b124,mittsure,jaipur',
        joiningDate:'24-02-2024',
        
      },
      {
        id: 1,
        name: 'mohit',
        role:'Student',
        phone: '9765285263',
        email: 'mohit@gmail.com',
        address:'b124,mittsure,jaipur',
        joiningDate:'24-02-2024',
        
      },
      {
        id: 1,
        name: 'lakshita',
        role:'School',
        phone: '9765241837',
        email: 'lakshita@gmail.com',
        address:'b124,mittsure,jaipur',
        joiningDate:'24-02-2024',
        
      },
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="container13">
      <div className="header13">
        <div className="searchContainer13">
          <input
            type="text"
            placeholder="Search here..."
            className="searchInput13"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
      </div>

      <div className="table13">
        <div className="tableHeader13 font-weight-bold">
          <div>User</div>
          <div>roles</div>
          <div>Phone number</div>
          <div>Email</div>
          <div>Address</div>
          <div>joining Date</div>
          <div>Action</div>
        </div>
        
        {filteredUsers.map(user => (
          <div key={user.id} className="tableRow13">
            <div className="userInfo13">
              <div className="userName13">{user.name}</div>
              
            </div>
            <div>{user.role}</div>
            <div>{user.phone}</div>
            <div>{user.email}</div>
            <div>{user.address}</div>
            <div>{user.joiningDate}</div>
            <div className="actionButtons13">
              <button className="actionButton13 viewButton13">
                <Eye size={20} />
              </button>
              <button className="actionButton13 editButton13">
                <Pencil size={20} />
              </button>
              <button 
                className="actionButton13 deleteButton13"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alluser;
