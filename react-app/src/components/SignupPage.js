import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./SignupPage.css";
import googleLogo from "./assets/images/google-logo.png";
import cleverLogo from "./assets/images/clever-logo.jpg";
import facebookLogo from "./assets/images/facebook-logo.png";
import appleLogo from "./assets/images/apple-logo.png";
import emailLogo from "./assets/images/email-logo.png";
import logoImage from "./logo.png";

const SignupPage = () => {
  const [role, setRole] = useState("learner");
  const [dob, setDob] = useState({ month: "", day: "", year: "" });
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignupWithEmail = () => {
    console.log("Signing up with Email as:", role);
    if (role === "learner") {
      console.log("Date of Birth:", dob);
      console.log("Email:", email);
      console.log("Username:", username);
      console.log("Password:", password);
    }
    navigate("/");
  };

  const handleSignupWithProvider = (provider) => {
    console.log("Signing up with:", provider);
    navigate("/teacher-dashboard");
  };

  return (
    <div className="signup-container">
      {/* Desktop Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark fixed-top d-none d-lg-block">
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
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
                onClick={() => navigate("/donate")} // Donate button
              >
                Donate
              </button>
              <button
                className="btn btn-outline-light me-2"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <button
                className="btn btn-success"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
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
                  onClick={() => navigate("/explore")}
                >
                  Explore
                </button>
                <button
                  className="btn btn-outline-light"
                  onClick={() => navigate("/donate")} // Donate button
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
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </button>
              </nav>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="signup-content">
        {/* Form Section */}
        <div className="signup-form-section">
          <h1>Sign up</h1>
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

          {/* Learners Section */}
          {role === "learner" && (
            <div className="signup-form">
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Choose a Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Use letters and numbers only"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Create a Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="At least 8 characters long"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="dob-section">
                <h3>What is your date of birth?</h3>
                <div className="dob-inputs">
                  <select
                    value={dob.month}
                    onChange={(e) => setDob({ ...dob, month: e.target.value })}
                  >
                    <option value="">Month</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    {/* Add all months here */}
                  </select>
                  <input
                    type="number"
                    placeholder="Day"
                    value={dob.day}
                    onChange={(e) => setDob({ ...dob, day: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Year"
                    value={dob.year}
                    onChange={(e) => setDob({ ...dob, year: e.target.value })}
                  />
                </div>
              </div>

              <button className="submit-button" onClick={handleSignupWithEmail}>
                Submit
              </button>
            </div>
          )}

          {/* Provider Buttons (Only for Teachers) */}
          {role === "teacher" && (
            <div className="provider-buttons">
              <button
                className="provider-button google"
                onClick={() => handleSignupWithProvider("Google")}
              >
                <img
                  src={googleLogo}
                  alt="Google Logo"
                  className="provider-logo"
                />
                <span>Continue with Google</span>
              </button>
              <button
                className="provider-button clever"
                onClick={() => handleSignupWithProvider("Clever")}
              >
                <img
                  src={cleverLogo}
                  alt="Clever Logo"
                  className="provider-logo"
                />
                <span>Continue with Clever</span>
              </button>
              <button
                className="provider-button facebook"
                onClick={() => handleSignupWithProvider("Facebook")}
              >
                <img
                  src={facebookLogo}
                  alt="Facebook Logo"
                  className="provider-logo"
                />
                <span>Continue with Facebook</span>
              </button>
              <button
                className="provider-button apple"
                onClick={() => handleSignupWithProvider("Apple")}
              >
                <img
                  src={appleLogo}
                  alt="Apple Logo"
                  className="provider-logo"
                />
                <span>Continue with Apple</span>
              </button>
              <button
                className="provider-button email"
                onClick={() => handleSignupWithProvider("Email")}
              >
                <img
                  src={emailLogo}
                  alt="Email Logo"
                  className="provider-logo"
                />
                <span>Sign up with Email</span>
              </button>
            </div>
          )}

          <p className="login-link">
            Already have an account? <a href="/login">Log in</a>
          </p>

          <p className="terms">
            By signing up for Pathshala, you agree to our{" "}
            <a href="/terms">Terms of use</a> and{" "}
            <a href="/privacy">Privacy Policy</a>.
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

export default SignupPage;