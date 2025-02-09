import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logoImage from "../logo.png";
import "./dashboard.css";

const Students = () => {
  const [showClassCodePopup, setShowClassCodePopup] = useState(false); // Popup for class code
  const [classCode, setClassCode] = useState(""); // State to store class code
  const [showSidebar, setShowSidebar] = useState(false); // State for sidebar

  const handleClassCodeSubmit = (e) => {
    e.preventDefault();
    console.log("Class code submitted:", classCode);
    setShowClassCodePopup(false); // Close the popup after submission
  };

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
              <button className="btn btn-outline-light me-2">Donate</button>
              <button className="btn btn-outline-light">Log out</button>
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
              <h1>Students</h1>
              <p>Track your students' progress and performance here.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Teachers</h5>
                  <p className="card-text">Shahid Ahamed 3</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Students</h5>
                  <p className="card-text">Add students to this class</p>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      console.log("Button clicked"); // Debugging
                      setShowClassCodePopup(true);
                    }}
                  >
                    1+ Invite students
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Popup for Class Code */}
      {showClassCodePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Share Class Code</h2>
            <p>Provide the class code to access student records.</p>
            <form onSubmit={handleClassCodeSubmit}>
              <div className="form-group">
                <label>Class Code</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter class code"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                  required
                />
              </div>
              <div className="popup-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowClassCodePopup(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;