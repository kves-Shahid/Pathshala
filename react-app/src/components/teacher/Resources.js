import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Ensure Bootstrap JS is imported
import logoImage from "../logo.png";
import "./Resources.css";

const Resources = () => {
  const navigate = useNavigate();
  const [classCode, setClassCode] = useState("");
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleDonate = (e) => {
    e.preventDefault();
    navigate("/donate");
  };

  const handleAddResource = () => {
    if (newResource.trim()) {
      setResources([...resources, newResource]);
      setNewResource("");
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("Search Query:", searchQuery); // Replace with your search logic
    }
  };

  return (
    <div className="resources-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark fixed-top">
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
            {/* Sidebar Toggle Button (Mobile) */}
            <button
              className="btn btn-outline-secondary me-3 d-lg-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasResponsive"
              aria-controls="offcanvasResponsive"
            >
              ☰
            </button>

            {/* Search Bar (Desktop) */}
            <div className="d-flex align-items-center me-auto">
              <div className="input-group search-bar d-none d-lg-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                />
                <button className="btn btn-success" type="button">
                  Search
                </button>
              </div>
            </div>

            {/* Logo */}
            <Link to="/" className="navbar-brand mx-auto">
              <img
                src={logoImage}
                alt="Pathshala Logo"
                className="navbar-logo"
                style={{ height: "40px" }}
              />
            </Link>

            {/* Donate and Settings Buttons (Desktop) */}
            <div className="d-flex align-items-center ms-auto d-none d-lg-flex">
              <button
                className="btn btn-outline-light me-2"
                onClick={handleDonate}
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

      {/* Mobile Offcanvas Sidebar */}
      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex="-1"
        id="offcanvasResponsive"
        aria-labelledby="offcanvasResponsiveLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasResponsiveLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {/* Search Bar (Mobile) */}
          <div className="search-bar mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
            />
          </div>

          {/* Sidebar Navigation Links */}
          <nav className="nav flex-column gap-2">
            <button className="btn btn-outline-light">Explore</button>
            <button
              className="btn btn-outline-light"
              onClick={handleDonate}
            >
              Donate
            </button>
            {/* Settings Button in Mobile Menu */}
            <button
              className="btn btn-outline-light"
              onClick={() => navigate("/settings")}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="resources-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h1>Resources</h1>
              <p>Access teaching resources and materials here.</p>

              {/* Class Code Input */}
              <div className="mb-4">
                <label htmlFor="classCode" className="form-label">
                  Enter Class Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="classCode"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                  placeholder="Enter class code"
                />
              </div>

              {/* Add Resource Section */}
              <div className="mb-4">
                <h3>Add Resource</h3>
                <textarea
                  className="form-control mb-2"
                  rows="3"
                  placeholder="Enter resource details..."
                  value={newResource}
                  onChange={(e) => setNewResource(e.target.value)}
                ></textarea>
                <button
                  className="btn btn-success"
                  onClick={handleAddResource}
                  disabled={!classCode.trim()}
                >
                  Add Resource
                </button>
              </div>

              {/* Resources List */}
              <div className="resources-list">
                <h3>Resources</h3>
                <div
                  className="scrollable-content"
                  style={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  {resources.map((resource, index) => (
                    <div key={index} className="resource-item mb-3">
                      <p>{resource}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card bg-dark border-0">
                <div className="card-body">
                  <h5 className="card-title">About Us</h5>
                  <p className="card-text">
                    Our mission is simple: to break down barriers to education
                    and provide opportunities for all. Join us on this journey
                    to make a lasting impact in the world of learning.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card bg-dark border-0">
                <div className="card-body">
                  <h5 className="card-title">Contact</h5>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        to="/help-centre"
                        className="text-white text-decoration-none"
                      >
                        Help Centre
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/support-community"
                        className="text-white text-decoration-none"
                      >
                        Support Community
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/share-story"
                        className="text-white text-decoration-none"
                      >
                        Share Your Story
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/press"
                        className="text-white text-decoration-none"
                      >
                        Press
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card bg-dark border-0">
                <div className="card-body">
                  <h5 className="card-title">Follow Us</h5>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        href="https://facebook.com"
                        className="text-white text-decoration-none"
                      >
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com"
                        className="text-white text-decoration-none"
                      >
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://instagram.com"
                        className="text-white text-decoration-none"
                      >
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://linkedin.com"
                        className="text-white text-decoration-none"
                      >
                        LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <p>© 2025 Pathshala. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Resources;