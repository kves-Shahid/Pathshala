import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logoImage from "../logo.png";
import "./stream.css";

const Stream = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleDonateClick = (e) => {
    e.preventDefault();
    navigate("/donate");
  };

  // Simulated list of classes
  const classes = [
    { id: 1, name: "MATH IV", section: "B", instructor: "Md. Majibul Hasan Imran" },
    { id: 2, name: "CSE 2200 | Spring 20...", section: "A, B", instructor: "Ashek Seum" },
    { id: 3, name: "Spring 2024 | CSE-2211", section: "A and B", instructor: "Tanvir Ahmed" },
    { id: 4, name: "Spring 24 | CSE 2213", section: "A, B", instructor: "SUMAIYA NUHA MUSTAFINA" },
    { id: 5, name: "Spring 24 CSE 2202", section: "A1, A2, B1, B2", instructor: "Subah Nawar" },
    { id: 6, name: "Advisory Info of Secti...", section: "B", instructor: "Tanjila Broti" },
  ];

  const handleClassClick = (classId) => {
    navigate(`/learner_dashboard/${classId}`);
  };

  return (
    <div className="stream-dashboard">
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
            <div className="d-flex align-items-center ms-auto">
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
                <button
                  className="btn btn-outline-light text-start"
                  onClick={() => navigate("/settings")}
                >
                  Settings
                </button>
                <button
                  className="btn btn-outline-light text-start"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </nav>
            </div>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="welcome-section">
        <p className="welcome-text">Welcome, Learner!</p>
      </div>

      {/* Main Content */}
      <main className="stream-content">
        <h1>Your Classes</h1>
        <div className="class-list row justify-content-center">
          {classes.map((cls) => (
            <div className="col-md-6 mb-4" key={cls.id}>
              <div className="class-card" onClick={() => handleClassClick(cls.id)}>
                <h3>{cls.name}</h3>
                <p><strong>Section:</strong> {cls.section}</p>
                <p><strong>Instructor:</strong> {cls.instructor}</p>
              </div>
            </div>
          ))}
        </div>
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

export default Stream;