import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./learner.css";
import logoImage from "../logo.png";

const Learner = () => {
  const navigate = useNavigate();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [classCode, setClassCode] = useState("");

  const handleDonateClick = (e) => {
    e.preventDefault();
    navigate("/donate");
  };

  const handleJoinClass = () => {
    setShowJoinModal(true);
  };

  const handleJoin = () => {
    console.log("Joining class with code:", classCode);
    setShowJoinModal(false); // Close the modal
    navigate("/stream"); // Redirect to the Stream page
  };

  return (
    <div className="learner-dashboard">
      {/* Desktop Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark fixed-top d-none d-lg-block">
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
            {/* Left Section */}
            <div className="d-flex align-items-center me-auto">
              <button
                className="btn btn-outline-success me-3"
                onClick={() => navigate("/explore")}
              >
                Explore
              </button>
              <div className="input-group search-bar">
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

            {/* Centered Logo */}
            <Link
              to="/"
              className="position-absolute top-50 start-50 translate-middle"
            >
              <img
                src={logoImage}
                alt="Pathshala Logo"
                className="navbar-logo"
                style={{ height: "40px" }}
              />
            </Link>

            {/* Right Section */}
            <div className="d-flex align-items-center ms-4"> {/* Changed ms-auto to ms-4 */}
              <button
                className="btn btn-outline-light me-2"
                onClick={handleDonateClick}
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

      {/* Mobile Navbar with Sidebar */}
      <nav className="navbar bg-dark fixed-top d-lg-none">
        <div className="container-fluid">
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
          >
            ☰
          </button>

          <Link to="/" className="navbar-brand">
            <img src={logoImage} alt="Pathshala Logo" className="navbar-logo" />
          </Link>

          <div
            className="offcanvas offcanvas-start bg-dark text-white"
            tabIndex="-1"
            id="mobileMenu"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Menu</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              {/* Search Bar */}
              <div className="search-bar mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                />
              </div>

              {/* Sidebar Menu */}
              <nav className="nav flex-column gap-2">
                <button
                  className="btn btn-outline-light text-start"
                  onClick={() => navigate("/explore")}
                >
                  Explore
                </button>
                <button
                  className="btn btn-outline-light text-start"
                  onClick={handleDonateClick}
                >
                  Donate
                </button>
                {/* Settings Button */}
                <button
                  className="btn btn-outline-light text-start"
                  onClick={() => navigate("/settings")}
                >
                  Settings
                </button>
              </nav>
            </div>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="welcome-section">
        <p className="welcome-text">Welcome, Learner!</p>
        <a href="#start-learning" className="start-learning-link">
          Start Learning
        </a>
      </div>

      {/* Main Content */}
      <main className="learner-content">
        <h1>Welcome, Learner!</h1>
        <p>
          Here, you can explore courses, track your progress, and level up your
          skills.
        </p>

        {/* Centered Join Class Button */}
        <div className="text-center mt-5">
          <button
            className="btn btn-success btn-lg"
            onClick={handleJoinClass}
          >
            Join a Class
          </button>
        </div>

        {/* Join Class Modal */}
        {showJoinModal && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <h2>Join Class</h2>
              <p>Ask your teacher for the class code, then enter it here.</p>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Class code"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
              />
              <p>
                To sign in with a class code:
                <ul>
                  <li>Use an authorised account</li>
                  <li>Use a class code with 5-7 letters or numbers, and no spaces or symbols</li>
                </ul>
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <Link
                  to="/help-centre"
                  className="text-decoration-none"
                >
                  <button className="btn btn-link">
                    Help Centre
                  </button>
                </Link>
                <div>
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => setShowJoinModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={handleJoin}
                    disabled={!classCode}
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Section */}
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
            <p className="mb-0">© 2025 Pathshala. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Learner;