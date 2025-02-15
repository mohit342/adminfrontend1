import React, { useState } from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
    const [settings, setSettings] = useState({
        profile: {
            name: 'Admin User',
            email: 'admin@example.com',
            avatar: '',
        },
        security: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            twoFactorAuth: true,
        },
        notifications: {
            emailNotifications: true,
            pushNotifications: false,
            monthlyReports: true,
        },
        appearance: {
            theme: 'light',
            density: 'normal',
        }
    });

    const [selectedTheme, setSelectedTheme] = useState('light');

    const handleInputChange = (section, field, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleThemeChange = (theme) => {
        setSelectedTheme(theme);
        handleInputChange('appearance', 'theme', theme);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleInputChange('profile', 'avatar', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle settings save here
        console.log('Saved settings:', settings);
        alert('Settings saved successfully!');
    };

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            
            {/* Profile Settings */}
            <div className="settings-section">
                <h2>Profile Settings</h2>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={settings.profile.name}
                        onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={settings.profile.email}
                        onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Profile Picture</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                    />
                    {settings.profile.avatar && (
                        <img 
                            src={settings.profile.avatar} 
                            alt="Profile Preview"
                            style={{ width: '100px', marginTop: '10px', borderRadius: '50%' }}
                        />
                    )}
                </div>
            </div>

            {/* Security Settings */}
            <div className="settings-section">
                <h2>Security Settings</h2>
                <div className="form-group">
                    <label>Current Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={settings.security.currentPassword}
                        onChange={(e) => handleInputChange('security', 'currentPassword', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={settings.security.newPassword}
                        onChange={(e) => handleInputChange('security', 'newPassword', e.target.value)}
                    />
                    <div className="password-strength">
                        <div 
                            className="strength-bar" 
                            style={{ 
                                width: '30%',
                                backgroundColor: '#ff4444' 
                            }}
                        ></div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={settings.security.confirmPassword}
                        onChange={(e) => handleInputChange('security', 'confirmPassword', e.target.value)}
                    />
                </div>
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                    />
                    <label>Enable Two-Factor Authentication</label>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="settings-section">
                <h2>Notification Settings</h2>
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        checked={settings.notifications.emailNotifications}
                        onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                    />
                    <label>Email Notifications</label>
                </div>
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        checked={settings.notifications.pushNotifications}
                        onChange={(e) => handleInputChange('notifications', 'pushNotifications', e.target.checked)}
                    />
                    <label>Push Notifications</label>
                </div>
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        checked={settings.notifications.monthlyReports}
                        onChange={(e) => handleInputChange('notifications', 'monthlyReports', e.target.checked)}
                    />
                    <label>Monthly Reports</label>
                </div>
            </div>

            {/* Appearance Settings */}
            <div className="settings-section">
                <h2>Appearance Settings</h2>
                <div className="form-group">
                    <label>Theme</label>
                    <div className="theme-selector">
                        <div 
                            className={`theme-option ${selectedTheme === 'light' ? 'active' : ''}`}
                            onClick={() => handleThemeChange('light')}
                        >
                            Light Mode
                        </div>
                        <div 
                            className={`theme-option ${selectedTheme === 'dark' ? 'active' : ''}`}
                            onClick={() => handleThemeChange('dark')}
                        >
                            Dark Mode
                        </div>
                        <div 
                            className={`theme-option ${selectedTheme === 'system' ? 'active' : ''}`}
                            onClick={() => handleThemeChange('system')}
                        >
                            System Default
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Density</label>
                    <select
                        className="form-control"
                        value={settings.appearance.density}
                        onChange={(e) => handleInputChange('appearance', 'density', e.target.value)}
                    >
                        <option value="compact">Compact</option>
                        <option value="normal">Normal</option>
                        <option value="comfortable">Comfortable</option>
                    </select>
                </div>
            </div>

            {/* Save Button */}
            <div style={{ textAlign: 'right', marginTop: '30px' }}>
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Save Changes
                </button>
                <button className="btn btn-secondary">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;