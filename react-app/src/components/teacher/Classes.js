<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Classes.css"; // Import the CSS for the Classes section
=======
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Classes.css";
>>>>>>> 8df69bb (Login commit)

const Classes = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar closed by default
<<<<<<< HEAD
  const [showKhanContent, setShowKhanContent] = useState(false); // State to manage Khan Academy content visibility

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const toggleKhanContent = () => {
    setShowKhanContent(!showKhanContent); // Toggle Khan Academy content visibility
  };

  return (
    <div className="classes-page container-fluid">
      {/* Separate Navbar for Classes Page */}
      <header className="classes-navbar">
        {/* Hamburger Icon to Toggle Sidebar */}
        <button className="sidebar-toggle" onClick={toggleSidebar}>
=======
  const [showHoverHeader, setShowHoverHeader] = useState(false); // Hover header visibility
  const email = "kazishahedpoco@example.com"; // Simulated email for demonstration

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  const handleDonateClick = (e) => {
    e.preventDefault();
    console.log("Donate clicked");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleHoverHeader = () => {
    setShowHoverHeader(!showHoverHeader);
  };

  // Automatically close the sidebar when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSidebarOpen]);

  return (
    <div className="classes-dashboard">
      {/* Navbar */}
      <header className="classes-navbar">
        <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
>>>>>>> 8df69bb (Login commit)
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>

<<<<<<< HEAD
        {/* Explore Link and Search Bar */}
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
=======
        <div className="navbar-left">
          <a href="#explore" className="nav-link">Explore</a>
          <div className="search-bar">
            <input type="text" className="search-input" placeholder="Search here..." />
>>>>>>> 8df69bb (Login commit)
            <button className="search-button">Search</button>
          </div>
        </div>

<<<<<<< HEAD
        {/* Logo in the Center */}
        <div className="navbar-center">
          <span className="logo-text">Pathshala</span>
        </div>

        {/* Donate and Logout on the Right */}
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

=======
        <div className="navbar-center">
          <Link to="/auth" className="logo-link">
            <span className="logo-text">Pathshala</span>
          </Link>
        </div>

        <div className="navbar-right">
          <a href="#donate" className="nav-link" onClick={handleDonateClick}>Donate</a>
          <button className="logout-button" onClick={handleLogout}>Log out</button>
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

>>>>>>> 8df69bb (Login commit)
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>Menu</h2>
        <ul>
<<<<<<< HEAD
          <li>
            <a href="#classes">Classes</a>
          </li>
          <li>
            <a href="#students">Students</a>
          </li>
          <li>
            <a href="#resources">Resources</a>
          </li>
=======
          <li><a href="#classes">Classes</a></li>
          <li><a href="#students">Students</a></li>
          <li><a href="#resources">Resources</a></li>
>>>>>>> 8df69bb (Login commit)
        </ul>
      </aside>

      {/* Main Content */}
      <main className={`classes-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
<<<<<<< HEAD
        {/* Main Sections */}
        <div className="main-sections">
          {/* Create a Class Section */}
=======
        <div className="main-sections">
>>>>>>> 8df69bb (Login commit)
          <section className="classes-section">
            <h2>Create a Class</h2>
            <p>
              Get a live view into your students' progress, targeted assignment
              recommendations, and so much more!
            </p>
<<<<<<< HEAD
            <button className="create-class-button btn btn-success">
              Create a Class
            </button>
          </section>

          {/* Onboarding Section */}
          <section className="onboarding-section">
            <h2>Continue Onboarding</h2>
            <p>
              Hi, kazishahedpoco! Continue your Khan for Educators onboarding
=======
            <button className="create-class-button btn btn-success">Create a Class</button>
          </section>

          <section className="onboarding-section">
            <h2>Continue Onboarding</h2>
            <p>
              Hi, kazishahedpoco! Continue your Pathshala for Educators onboarding
>>>>>>> 8df69bb (Login commit)
              here.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </section>

<<<<<<< HEAD
          {/* Getting to Know Khan Academy Section */}
          <section className="khan-section">
            <h2>Getting to Pathshala</h2>
            <button onClick={toggleKhanContent} className="btn btn-info">
              {showKhanContent ? "Hide" : "Show"}
            </button>
            {showKhanContent && (
              <div className="row">
                <div className="col-md-4">
                  <h3>Using Assignments</h3>
                  <p>Learn how to create and manage assignments.</p>
                </div>
                <div className="col-md-4">
                  <h3>Reports</h3>
                  <p>Track student progress with detailed reports.</p>
                </div>
                <div className="col-md-4">
                  <h3>Supporting Student Progress</h3>
                  <p>Help students achieve their learning goals.</p>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Help and Tips Section */}
=======
          <section className="khan-section">
            <h2>Getting to Pathshala</h2>
            <button className="btn btn-info">Show</button>
          </section>
        </div>

>>>>>>> 8df69bb (Login commit)
        <div className="help-section">
          <h2>Help and Tips</h2>
          <div className="help-tips">
            <a href="#making-assignments" className="help-tip">
              <h3>Making Assignments</h3>
              <p>Create assignments and mastery goals for your students.</p>
            </a>
            <a href="#reporting-options" className="help-tip">
              <h3>Reporting Options</h3>
              <p>Explore tools to track student performance.</p>
            </a>
            <a href="#courses-with-mastery" className="help-tip">
              <h3>Courses with Mastery</h3>
              <p>Discover which courses have Mastery enabled.</p>
            </a>
            <a href="#learnstorm-tracker" className="help-tip">
              <h3>LearnStorm Tracker</h3>
              <p>Engage your classroom with this tool.</p>
            </a>
          </div>
          <p className="help-center-link">
            Need more help? Visit our <a href="/help">Help Center</a>.
          </p>
        </div>
      </main>
<<<<<<< HEAD
=======

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
          <a href="#help-center" className="nav-link">Help Centre</a>
          <a href="#support-community" className="nav-link">Support Community</a>
          <a href="#share-story" className="nav-link">Share Your Story</a>
          <a href="#press" className="nav-link">Press</a>
        </div>
      </section>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <p>© 2025 Pathshala. All rights reserved.</p>
      </div>
>>>>>>> 8df69bb (Login commit)
    </div>
  );
};

export default Classes;