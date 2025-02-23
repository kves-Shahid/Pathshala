import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext"; // Correct import path
import "./settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext); // Use ThemeContext

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      {/* User Profile Section */}
      <div className="settings-section">
        <div className="settings-header">
          <h2 className="profile-name">Kapil Mohan</h2>
          <button className="edit-button">Edit personal details</button>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="settings-section">
        <div className="settings-item">
          <span className="settings-label">Dark Mode</span>
          <label className="switch">
            <input
              type="checkbox"
              id="dark-mode-toggle"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="settings-section">
        <h2 className="section-title">Profile</h2>
        <div className="settings-item">
          <span className="settings-label">Edit Profile</span>
          <button className="edit-button">Edit</button>
        </div>
        <div className="settings-item">
          <span className="settings-label">Change Password</span>
          <button className="edit-button">Change</button>
        </div>
      </div>

      {/* Notifications */}
      <div className="settings-section">
        <h2 className="section-title">Notifications</h2>
        <div className="settings-item">
          <span className="settings-label">Notifications</span>
          <label className="switch">
            <input type="checkbox" id="notifications-toggle" defaultChecked />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="settings-section">
        <h2 className="section-title">Regional</h2>
        <div className="settings-item">
          <span className="settings-label">Language</span>
          <select className="language-select">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>

      {/* Logout */}
      <div className="settings-section">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* App Version */}
      <div className="app-version">
        <p>App ver 2.0.1</p>
      </div>
    </div>
  );
};

export default Settings;