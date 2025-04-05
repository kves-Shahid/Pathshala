import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./press.css";
import logoImage from "../logo.png";

const Press = () => {
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ type: "", description: "" });

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
    navigate("/donate"); 
  };

  const handleLoginRedirect = () => navigate("/login");
  const handleSignupRedirect = () => navigate("/signup");
  const handleExploreClick = (e) => {
    e.preventDefault();
    console.log("Explore clicked");
  };

  const handlePressRequest = async (type, description) => {
    setPopupContent({ type, description });
    setShowPopup(true);
  };

  const handleSubmit = async (email) => {
    if (!email) {
      alert("Email is required!");
      return;
    }

    try {
      const response = await fetch("/api/v1/press/press-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: popupContent.type, message: popupContent.description }),
      });

      const data = await response.json();
      alert(data.message); 
    } catch (error) {
      console.error("Error submitting press request:", error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setShowPopup(false);
    }
  };

  return (
    <div className="press-page" style={{ paddingTop: `${navHeight}px` }}>
    
      <nav
        className="navbar navbar-expand-lg bg-dark fixed-top d-none d-lg-block"
        ref={navbarRef}
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
            
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

      
      <main className="press-content">
        <h1>Press</h1>
        <div className="press-section">
          <h2>Latest News</h2>
          <div
            className="news-item clickable"
            onClick={() =>
              handlePressRequest(
                "news",
                "Request for news update: Pathshala Launches New Learning Platform"
              )
            }
          >
            <h3>Pathshala Launches New Learning Platform</h3>
            <p>Read about our latest innovations in education technology...</p>
          </div>
          <div
            className="news-item clickable"
            onClick={() =>
              handlePressRequest(
                "interview",
                "Request for interview details: Interview with Our Founder"
              )
            }
          >
            <h3>Interview with Our Founder</h3>
            <p>Learn more about the vision behind Pathshala...</p>
          </div>
        </div>

        <div className="contact-section">
          <h2>Contact Us for Press Inquiries</h2>
          <button
            className="btn btn-success"
            onClick={() =>
              handlePressRequest(
                "press_contact",
                "Contact press team for inquiries"
              )
            }
          >
            Contact Press Team
          </button>
        </div>
      </main>

     
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

      
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Enter Your Email</h3>
            <input
              type="email"
              placeholder="Your email address"
              id="emailInput"
            />
            <div className="popup-buttons">
              <button onClick={() => setShowPopup(false)}>Cancel</button>
              <button
                onClick={() => {
                  const email = document.getElementById("emailInput").value;
                  handleSubmit(email);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Press;