import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logoImage from "../logo.png";
import "./dashboard.css";
import { Pencil } from "react-bootstrap-icons"; // Importing a pencil icon

const Dashboard = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const [showCreateClassPopup, setShowCreateClassPopup] = useState(false);
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [room, setRoom] = useState("");
  const [showSidebar, setShowSidebar] = useState(false); // Sidebar hidden by default

  const handleAgree = () => {
    setShowPopup(false);
    setShowCreateClassPopup(true);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleDonateClick = (e) => {
    e.preventDefault();
    console.log("Donate clicked");
  };

  const handleCreateClass = () => {
    console.log("Class created:", { className, section, subject, room });
    setShowCreateClassPopup(false);
  };

  const isCreateButtonDisabled = !className.trim();

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark fixed-top">
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
            <div className="d-flex align-items-center me-auto">
              <div className="input-group search-bar d-none d-lg-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                />
                <button className="btn btn-success" type="button">
                  Search
                </button>
              </div>
            </div>
            <Link to="/" className="navbar-brand mx-auto">
              <img
                src={logoImage}
                alt="Pathshala Logo"
                className="navbar-logo"
                style={{ height: "40px" }}
              />
            </Link>
            <div className="d-flex align-items-center ms-auto">
              <button
                className="btn btn-outline-light me-2"
                onClick={handleDonateClick}
              >
                Donate
              </button>
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Top Bar */}
      <div className="top-bar">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-secondary me-3"
            type="button"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            ☰
          </button>
          <nav className="nav">
            <Link to="/stream" className="nav-link">
              Stream
            </Link>
            <Link to="/classwork" className="nav-link">
              Classwork
            </Link>
            <Link to="/people" className="nav-link">
              People
            </Link>
            <Link to="/marks" className="nav-link">
              Marks
            </Link>
          </nav>
        </div>
      </div>

      {/* Sidebar - Slides out from the top bar */}
      <div
        className={`sidebar bg-dark text-white ${showSidebar ? 'show' : 'hide'}`}
      >
        <div className="sidebar-header">
          <h5>Classroom</h5>
          <button
            type="button"
            className="btn-close btn-close-white d-lg-none"
            onClick={() => setShowSidebar(false)}
            aria-label="Close"
          ></button>
        </div>
        <div className="sidebar-body">
          <nav className="nav flex-column">
            <Link to="/home" className="nav-link text-white">
              Home
            </Link>
            <Link to="/stream" className="nav-link text-white">
              Stream
            </Link>
            <Link to="/classwork" className="nav-link text-white">
              Classwork
            </Link>
            <Link to="/people" className="nav-link text-white">
              People
            </Link>
            <Link to="/marks" className="nav-link text-white">
              Marks
            </Link>
            <hr className="text-white" />
            <h6 className="text-white">Teaching</h6>
            <Link to="/to-review" className="nav-link text-white">
              To Review
            </Link>
            <hr className="text-white" />
            <h6 className="text-white">Archived Classes</h6>
            <Link to="/settings" className="nav-link text-white">
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="dashboard-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h2>Classroom</h2>
              {/* Customize Section - Moved to the top */}
              <div className="card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Customize</h5>
                    <button className="btn btn-outline-success">
                      <Pencil /> {/* Pencil icon */}
                    </button>
                  </div>
                  <div className="blank-box" style={{ height: "150px", border: "1px dashed #ccc", borderRadius: "8px" }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Stream</h5>
                  <p className="card-text">Announce something to your class</p>
                  <p className="card-text"><strong>Class code:</strong> 7evppy4</p>
                  <div className="d-flex flex-column gap-2">
                    <button className="btn btn-success">View all</button>
                    <button className="btn btn-success">Stream settings</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Upcoming</h5>
                  <p className="card-text">No work due in soon</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Classwork</h5>
                  <p className="card-text">Manage assignments and materials</p>
                  <button className="btn btn-success">View assignments</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">People</h5>
                  <p className="card-text">Manage students and co-teachers</p>
                  <button className="btn btn-success">View people</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Marks</h5>
                  <p className="card-text">View and manage student grades</p>
                  <button className="btn btn-success">View marks</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Popup Modals */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Using Classroom at a school/university with students?</h2>
            <p>
              If so, your school must sign up for a Google Workspace for Education
              account before you can use Classroom. Learn more.
            </p>
            <p>
              Google Workspace for Education lets schools/universities decide which
              Google services their students can use, and provides additional privacy
              and security protection that is important in a school or university
              setting. Students cannot use Google Classroom in a school or university
              with their personal accounts.
            </p>
            <div className="popup-actions">
              <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>
                Go back
              </button>
              <button className="btn btn-primary" onClick={handleAgree}>
                I agree
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateClassPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Create Class</h2>
            <form>
              <div className="form-group">
                <label>Class Name (required)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter class name"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Section</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter section"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Room</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter room"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                />
              </div>
              <div className="popup-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateClassPopup(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCreateClass}
                  disabled={isCreateButtonDisabled}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;