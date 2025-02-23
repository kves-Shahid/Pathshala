import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./support.css";
import logoImage from "../logo.png";

const SupportCommunity = () => {
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (navbarRef.current) {
        setNavHeight(navbarRef.current.offsetHeight);
      }
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (navbarRef.current) resizeObserver.observe(navbarRef.current);

    window.addEventListener("resize", handleResize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDonateClick = (e) => {
    e.preventDefault();
    navigate("/donate"); // Navigate to the Donate page
  };

  const handleLoginRedirect = () => navigate("/login");
  const handleSignupRedirect = () => navigate("/signup");
  const handleExploreClick = (e) => {
    e.preventDefault();
    console.log("Explore clicked");
  };

  return (
    <div className="support-page" style={{ paddingTop: `${navHeight}px` }}>
      {/* Desktop Navbar */}
      <nav
        className="navbar navbar-expand-lg bg-dark fixed-top d-none d-lg-block"
        ref={navbarRef}
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
            {/* Left Section */}
            <div className="d-flex align-items-center me-auto">
              <button
                className="btn btn-outline-success me-3"
                onClick={handleExploreClick}
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
              <button
                className="btn btn-outline-light me-2"
                onClick={handleLoginRedirect}
              >
                Log in
              </button>
              <button
                className="btn btn-success"
                onClick={handleSignupRedirect}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="navbar bg-dark fixed-top d-lg-none" ref={navbarRef}>
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
              <div className="search-bar mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                />
              </div>

              <nav className="nav flex-column gap-2">
                <button
                  className="btn btn-outline-light text-start"
                  onClick={handleExploreClick}
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
                  onClick={handleLoginRedirect}
                >
                  Log in
                </button>
                <button
                  className="btn btn-success text-start"
                  onClick={handleSignupRedirect}
                >
                  Sign up
                </button>
              </nav>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="support-content">
        <h1>Support Community</h1>
        <p>
          Welcome to the Pathshala Support Community! Here, you can find help,
          share your story, and connect with others.
        </p>
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

export default SupportCommunity;