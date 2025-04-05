import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./loginpage.css";
import googleLogo from "../assets/images/google-logo.png";
import logoImage from "../logo.png";

const LoginPage = () => {
  const [role, setRole] = useState("learner");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginAction = async () => {
    try {
      const endpoint =
        role === "teacher" ? "/api/v1/user/login" : "/api/v1/learner/login";

      const res = await axios.post(`http://localhost:8080${endpoint}`, {
        email: loginId,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role); 
        message.success(res.data.message);
        role === "teacher"
          ? navigate("/teacher-dashboard")
          : navigate("/learner");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleLoginProviderAction = (provider) => {
    console.log("Provider login:", provider);
    role === "learner" ? navigate("/learner") : navigate("/teacher-dashboard");
  };

  const handleLoginSignupAction = () => navigate("/signup");
  const handleLoginForgotPassword = () => navigate("/forget-password");
  const handleLoginDonateClick = (e) => {
    e.preventDefault();
    navigate("/donate");
  };
  const handleLoginExploreClick = (e) => {
    e.preventDefault();
    console.log("Explore clicked");
  };

  return (
    <div className="login-container">
      
      <nav className="navbar navbar-expand-lg bg-dark fixed-top d-none d-lg-block">
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
            <div className="d-flex align-items-center me-auto">
              <button
                className="btn btn-outline-success me-3"
                onClick={handleLoginExploreClick}
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
                onClick={handleLoginDonateClick}
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
                onClick={handleLoginSignupAction}
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
                  onClick={handleLoginExploreClick}
                >
                  Explore
                </button>
                <button
                  className="btn btn-outline-light"
                  onClick={handleLoginDonateClick}
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
                  onClick={handleLoginSignupAction}
                >
                  Sign up
                </button>
              </nav>
            </div>
          </div>
        </div>
      </nav>

     
      <div className="login-content">
        
        <div className="login-form-section">
          <h1>Log in</h1>
          <p>Join Pathshala for free as a</p>
          <div className="login-role-buttons">
            <button
              className={role === "learner" ? "login-active" : ""}
              onClick={() => setRole("learner")}
            >
              Learner
            </button>
            <button
              className={role === "teacher" ? "login-active" : ""}
              onClick={() => setRole("teacher")}
            >
              Teacher
            </button>
          </div>

          <div className="login-form">
            <div className="login-form-group">
              <label htmlFor="loginId">Email or Username *</label>
              <input
                type="text"
                id="loginId"
                placeholder="Enter your email or username"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
              />
            </div>
            <div className="login-form-group">
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
            <p className="login-forgot-password">
              <button onClick={handleLoginForgotPassword}>
                Forgot password?
              </button>
            </p>
          </div>

         
          <div className="login-provider-buttons">
            <button
              className="login-provider-button google"
              onClick={() => handleLoginProviderAction("Google")}
            >
              <img
                src={googleLogo}
                alt="Google Logo"
                className="login-provider-logo"
              />
              <span>Continue with Google</span>
            </button>
          </div>

          
          <p className="login-signup-link">
            Don't have an account?{" "}
            <button onClick={handleLoginSignupAction}>Sign up</button>
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

export default LoginPage;
