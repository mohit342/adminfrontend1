import React, { useState } from 'react';
import './Notification.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'New order received from Sourabh',
      type: 'info',
      date: '2023-07-25 09:30',
      read: false
    },
    {
      id: 2,
      message: 'Payment failed for order #12345',
      type: 'error',
      date: '2023-07-25 10:15',
      read: false
    },
    {
      id: 3,
      message: 'Product "Pencil" is low in stock',
      type: 'warning',
      date: '2023-07-24 15:45',
      read: true
    },
    {
      id: 4,
      message: 'New user registered: Sourabh@example.com',
      type: 'success',
      date: '2023-07-24 12:20',
      read: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>Notifications</h2>
        <div className="notification-controls">
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      <div className="notification-list">
        {filteredNotifications.map(notification => (
          <div 
            key={notification.id}
            className={`notification-item ${notification.type} ${!notification.read ? 'unread' : ''}`}
          >
            <div className="notification-icon">
              {notification.type === 'info' && 'ℹ️'}
              {notification.type === 'success' && '✅'}
              {notification.type === 'warning' && '⚠️'}
              {notification.type === 'error' && '❌'}
            </div>
            <div className="notification-content">
              <p className="notification-message">{notification.message}</p>
              <p className="notification-date">{notification.date}</p>
            </div>
            <div className="notification-actions">
              {!notification.read && (
                <button 
                  className="mark-read"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as Read
                </button>
              )}
              <button 
                className="delete-btn"
                onClick={() => deleteNotification(notification.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;