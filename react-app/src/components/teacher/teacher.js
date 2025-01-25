import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import "./teacher.css"; // Import the CSS for the Teacher Dashboard

const Teacher = () => {
  const navigate = useNavigate();
  const [showHoverHeader, setShowHoverHeader] = useState(false);
  const email = "kazishahedpoco@example.com"; // Simulated email for demonstration

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

  const toggleHoverHeader = () => {
    setShowHoverHeader(!showHoverHeader);
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
          {/* Wrap the logo-text with a Link */}
          <Link to="/" className="logo-link">
            <span className="logo-text">Pathshala</span>
          </Link>
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

      {/* Welcome Section (Under Navbar) */}
      <div className="welcome-section">
        <p className="welcome-text">Welcome, {email}</p>
        <a href="#add-school" className="add-school-link">
          Add your University
        </a>
      </div>

      {/* Hover Header */}
      <div
        className={`hover-header ${showHoverHeader ? "visible" : ""}`}
        onMouseEnter={toggleHoverHeader}
        onMouseLeave={toggleHoverHeader}
      >
        <div className="hover-header-content">
          <p>Welcome, {email}</p>
          <a href="#add-university" className="add-university-link">
            Add your university
          </a>
        </div>
      </div>

      {/* Main Content */}
      <main className="teacher-content">
        <h1>Let's get started</h1>
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

      {/* About Us Section */}
      <section className="about-us-section">
        <h2>About Us</h2>
        <p>
          Our mission is simple: to break down barriers to education and
          provide opportunities for all. Join us on this journey to make a
          lasting impact in the world of learning.
        </p>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>Contact</h2>
        <div className="contact-links">
          <a href="#help-center" className="nav-link">
            Help Centre
          </a>
          <a href="#support-community" className="nav-link">
            Support Community
          </a>
          <a href="#share-story" className="nav-link">
            Share Your Story
          </a>
          <a href="#press" className="nav-link">
            Press
          </a>
        </div>
      </section>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <p>© 2025 Pathshala. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Teacher;
