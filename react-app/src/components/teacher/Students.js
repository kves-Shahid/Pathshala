import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, NavLink } from "react-router-dom"; // Import useParams and NavLink
import "bootstrap/dist/css/bootstrap.min.css";
import logoImage from "../logo.png";
import "./dashboard.css";

const Students = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { id } = useParams(); // Get the class ID from the URL
  const [showClassCodePopup, setShowClassCodePopup] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClassCodeSubmit = (e) => {
    e.preventDefault();
    console.log("Class code submitted:", classCode);
    setShowClassCodePopup(false);
  };

  const handleDonateClick = (e) => {
    e.preventDefault();
    navigate("/donate"); // Navigate to the Donate page
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark fixed-top">
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
            <button
              className="btn btn-outline-secondary me-3 d-lg-none"
              type="button"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              ☰
            </button>
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
                onClick={handleDonateClick} // Connect to handleDonateClick
              >
                Donate
              </button>
              {/* Settings Button */}
              <button
                className="btn btn-outline-light me-2"
                onClick={() => navigate("/settings")}
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Top Bar - Updated Stream link */}
      <div className="top-bar d-none d-lg-block">
        <div className="d-flex align-items-center">
          <nav className="nav">
            <NavLink
              to={`/class/${id}`} // Dynamic path with class ID
              className="nav-link"
              activeClassName="active"
            >
              Stream
            </NavLink>
            <NavLink
              to="/teacher/classwork"
              className="nav-link"
              activeClassName="active"
            >
              Classwork
            </NavLink>
            <NavLink
              to="/teacher/students"
              className="nav-link"
              activeClassName="active"
            >
              People
            </NavLink>
            <NavLink to="/teacher/marks" className="nav-link" activeClassName="active">
              Marks
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Sidebar - Slides out from the left side on smaller screens */}
      <div
        className={`sidebar bg-dark text-white ${
          showSidebar ? "show" : "hide"
        }`}
      >
        <div className="sidebar-header">
          <h5>Students</h5>
        </div>
        <div className="sidebar-body">
          <nav className="nav flex-column">
            <Link to="/home" className="nav-link text-white">
              Home
            </Link>
            <NavLink
              to={`/class/${id}`} // Dynamic path with class ID
              className="nav-link text-white"
              activeClassName="active"
            >
              Stream
            </NavLink>
            <NavLink
              to="/teacher/classwork"
              className="nav-link text-white"
              activeClassName="active"
            >
              Classwork
            </NavLink>
            <NavLink
              to="/teacher/students"
              className="nav-link text-white"
              activeClassName="active"
            >
              People
            </NavLink>
            <NavLink
              to="/teacher/marks"
              className="nav-link text-white"
              activeClassName="active"
            >
              Marks
            </NavLink>
            <hr className="text-white" />
            <h6 className="text-white">Stream</h6>
            <Link to="/to-review" className="nav-link text-white">
              To Review
            </Link>
            <hr className="text-white" />
            <h6 className="text-white">Classwork</h6>
            <Link to="/settings" className="nav-link text-white">
              Settings
            </Link>
            <hr className="text-white" />
            <h6 className="text-white">People</h6>
            <Link to="/to-people" className="nav-link text-white">
              To Review
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main
        className={`dashboard-content ${showSidebar ? "sidebar-open" : ""}`}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h1>Students</h1>
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
                      console.log("Button clicked");
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