import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Classes.css"; // Import the CSS for the Classes section

const Classes = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar closed by default
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
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>

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
            <button className="search-button">Search</button>
          </div>
        </div>

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

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>Menu</h2>
        <ul>
          <li>
            <a href="#classes">Classes</a>
          </li>
          <li>
            <a href="#students">Students</a>
          </li>
          <li>
            <a href="#resources">Resources</a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className={`classes-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        {/* Main Sections */}
        <div className="main-sections">
          {/* Create a Class Section */}
          <section className="classes-section">
            <h2>Create a Class</h2>
            <p>
              Get a live view into your students' progress, targeted assignment
              recommendations, and so much more!
            </p>
            <button className="create-class-button btn btn-success">
              Create a Class
            </button>
          </section>

          {/* Onboarding Section */}
          <section className="onboarding-section">
            <h2>Continue Onboarding</h2>
            <p>
              Hi, kazishahedpoco! Continue your Khan for Educators onboarding
              here.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </section>

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
    </div>
  );
};

export default Classes;