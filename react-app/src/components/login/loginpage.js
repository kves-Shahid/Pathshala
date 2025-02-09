import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./loginpage.css";
import googleLogo from "../assets/images/google-logo.png";
import cleverLogo from "../assets/images/clever-logo.jpg";
import facebookLogo from "../assets/images/facebook-logo.png";
import appleLogo from "../assets/images/apple-logo.png";
import logoImage from "../logo.png";

const LoginPage = () => {
  const [role, setRole] = useState("learner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  const handleLoginAction = () => {
    console.log("Logging in as:", role, "Email:", email, "Password:", password);
    role === "learner" ? navigate("/learner") : navigate("/teacher-dashboard");
  };

  const handleProviderAction = (provider) => {
    console.log("Provider login:", provider);
    role === "learner" ? navigate("/learner") : navigate("/teacher-dashboard");
  };

  const handleSignupAction = () => navigate("/signup");
  const handleForgotPassword = () => navigate("/forget-password");
  const handleDonateClick = (e) => {
    e.preventDefault();
    console.log("Donate clicked");
  };
  const handleExploreClick = (e) => {
    e.preventDefault();
    console.log("Explore clicked");
  };

  return (
    <div className="login-container">
      {/* Desktop Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark fixed-top d-none d-lg-block">
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
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <button className="btn btn-success" onClick={handleSignupAction}>
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
          <Link to="/" className="navbar-brand mx-auto">
            <img
              src={logoImage}
              alt="Pathshala Logo"
              className="navbar-logo"
              style={{ height: "40px" }}
            />
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
                  className="btn btn-outline-light"
                  onClick={handleExploreClick}
                >
                  Explore
                </button>
                <button
                  className="btn btn-outline-light"
                  onClick={handleDonateClick}
                >
                  Donate
                </button>
                <button
                  className="btn btn-outline-light"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleSignupAction}
                >
                  Sign up
                </button>
              </nav>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="login-content">
        {/* Mobile Text Overlay */}
        <div className="mobile-text-overlay d-lg-none">
          <h2>Join Pathshala and learn with us</h2>
          <p>Log in to Pathshala to get started!</p>
          <p>
            By logging in to Pathshala, you agree to our{" "}
            <a href="/terms">Terms of use</a> and{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </div>

        {/* Image Section - Hidden on Mobile */}
        <div className="login-image-section d-none d-lg-flex">
          <img
            src="https://w0.peakpx.com/wallpaper/525/128/HD-wallpaper-enlightenment-acknowledgment-bulb-education-facts-future-iphone-science-scientific-technology.jpg"
            alt="Education"
            className="login-image"
          />
          <div className="image-overlay">
            <h2>Join Pathshala and learn with us</h2>
            <p>Log in to Pathshala to get started!</p>
            <p>
              By logging in to Pathshala, you agree to our{" "}
              <a href="/terms">Terms of use</a> and{" "}
              <a href="/privacy">Privacy Policy</a>.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="login-form-section">
          <h1>Log in</h1>
          <p>Join Pathshala for free as a</p>
          <div className="role-buttons">
            <button
              className={role === "learner" ? "active" : ""}
              onClick={() => setRole("learner")}
            >
              Learner
            </button>
            <button
              className={role === "teacher" ? "active" : ""}
              onClick={() => setRole("teacher")}
            >
              Teacher
            </button>
          </div>

          <div className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email or username *</label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="login-page-button" onClick={handleLoginAction}>
              Log in
            </button>
            <p className="forgot-password">
              <button onClick={handleForgotPassword}>Forgot password?</button>
            </p>
          </div>

          <div className="provider-buttons">
            {[
              { name: "Google", logo: googleLogo },
              { name: "Clever", logo: cleverLogo },
              { name: "Facebook", logo: facebookLogo },
              { name: "Apple", logo: appleLogo },
            ].map(({ name, logo }) => (
              <button
                key={name}
                className={`provider-button ${name.toLowerCase()}`}
                onClick={() => handleProviderAction(name)}
              >
                <img
                  src={logo}
                  alt={`${name} Logo`}
                  className="provider-logo"
                />
                <span>Continue with {name}</span>
              </button>
            ))}
          </div>

          <p className="signup-link">
            Don't have an account?{" "}
            <button onClick={handleSignupAction}>Sign up</button>
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-0">© 2025 Pathshala. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
