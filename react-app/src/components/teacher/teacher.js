import React from "react";
import { useNavigate } from "react-router-dom";
import "./teacher.css"; // Import the CSS for the Teacher Dashboard

const Teacher = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out...");
    navigate("/"); // Redirect to the home page after logout
  };

  const handleDonateClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    console.log("Donate clicked");
    // Add your donate logic here (e.g., open a modal, redirect to a donation page, etc.)
  };

  return (
    <div className="teacher-dashboard">
      {/* Fixed Navbar for Teacher Dashboard */}
      <header className="teacher-navbar">
        <div className="navbar-left">
          <a href="#explore" className="nav-link">
            Explore
          </a>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search here..."
            />
            <button className="search-button">Search</button>
          </div>
        </div>
        <div className="navbar-center">
          <span className="logo-text">Pathshala</span>
        </div>
        <div className="navbar-right">
          <a
            href="#donate" // Keep the href for accessibility, but prevent default behavior
            className="nav-link"
            onClick={handleDonateClick}
          >
            Donate
          </a>
          <button className="logout-button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="teacher-content">
        <h1>Welcome</h1>
        <p>Here, you can manage your classes, students, and resources.</p>

        {/* Clickable Cards for Classes, Students, and Resources */}
        <div className="dashboard-cards">
          <div
            className="dashboard-card"
            onClick={() => navigate("/teacher/classes")}
          >
            <h2>Classes</h2>
            <p>View and manage your classes.</p>
          </div>

          <div
            className="dashboard-card"
            onClick={() => navigate("/teacher/students")}
          >
            <h2>Students</h2>
            <p>Track your students' progress and performance.</p>
          </div>

          <div
            className="dashboard-card"
            onClick={() => navigate("/teacher/resources")}
          >
            <h2>Resources</h2>
            <p>Access teaching resources and materials.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Teacher;