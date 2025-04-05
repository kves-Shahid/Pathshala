import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./SignupPage.css";
import googleLogo from "./assets/images/google-logo.png";
import logoImage from "./logo.png";

const SignupPage = () => {
  const [role, setRole] = useState("learner");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignupWithEmail = async () => {
    try {
        const endpoint = role === "teacher" 
            ? "/api/v1/user/register" 
            : "/api/v1/learner/register";

        const res = await axios.post(`http://localhost:8080${endpoint}`, {
            name,
            email,
            password,
        });

        if (res.data.success) {
            message.success(res.data.message);
            navigate("/login");
        } else {
            message.error(res.data.message); 
        }
    } catch (error) {
        console.error("Registration error:", error);
        message.error(error.response?.data?.message || "Registration failed. Please try again.");
    }
};

  const handleSignupWithGoogle = () => {
    console.log("Signing up with Google as:", role);
    role === "learner" ? navigate("/learner") : navigate("/teacher-dashboard");
  };

  return (
    <div className="signup-container">
    
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
                onClick={() => navigate("/donate")}
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
                  onClick={() => navigate("/donate")}
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

      
      <div className="signup-content">
    
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

          
          <div className="provider-buttons">
            <button
              className="provider-button google"
              onClick={handleSignupWithGoogle}
            >
              <img
                src={googleLogo}
                alt="Google Logo"
                className="provider-logo"
              />
              <span>Sign up with Google</span>
            </button>
          </div>

          {role === "learner" && (
            <div className="signup-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

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
                <label htmlFor="password">Create a Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="At least 8 characters long"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="submit-button" onClick={handleSignupWithEmail}>
                Sign Up
              </button>
            </div>
          )}

         
          {role === "teacher" && (
            <div className="signup-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

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
                <label htmlFor="password">Create a Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="At least 8 characters long"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="submit-button" onClick={handleSignupWithEmail}>
                Sign Up
              </button>
            </div>
          )}

          <p className="login-link">
            Already have an account? <Link to="/login">Log in</Link>
          </p>

          <p className="terms">
            By signing up for Pathshala, you agree to our{" "}
            <Link to="/terms">Terms of use</Link> and{" "}
            <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      <footer className="footer bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-0">© 2025 Pathshala. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SignupPage;