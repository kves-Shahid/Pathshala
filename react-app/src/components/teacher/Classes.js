import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Classes.css";

const Classes = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar closed by default
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
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>

        <div className="navbar-left">
          <a href="#explore" className="nav-link">Explore</a>
          <div className="search-bar">
            <input type="text" className="search-input" placeholder="Search here..." />
            <button className="search-button">Search</button>
          </div>
        </div>

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

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>Menu</h2>
        <ul>
          <li><a href="#classes">Classes</a></li>
          <li><a href="#students">Students</a></li>
          <li><a href="#resources">Resources</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className={`classes-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div className="main-sections">
          <section className="classes-section">
            <h2>Create a Class</h2>
            <p>
              Get a live view into your students' progress, targeted assignment
              recommendations, and so much more!
            </p>
            <button className="create-class-button btn btn-success">Create a Class</button>
          </section>

          <section className="onboarding-section">
            <h2>Continue Onboarding</h2>
            <p>
              Hi, kazishahedpoco! Continue your Pathshala for Educators onboarding
              here.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </section>

          <section className="khan-section">
            <h2>Getting to Pathshala</h2>
            <button className="btn btn-info">Show</button>
          </section>
        </div>

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
    </div>
  );
};

export default Classes;