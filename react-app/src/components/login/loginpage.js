import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginpage.css";
import googleLogo from "../assets/images/google-logo.png";
import cleverLogo from "../assets/images/clever-logo.jpg";
import facebookLogo from "../assets/images/facebook-logo.png";
import appleLogo from "../assets/images/apple-logo.png";

const LoginPage = () => {
  const [role, setRole] = useState("learner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Unique function name for the login button
  const handleLoginPageButtonClick = () => {
    console.log("Login button clicked on LoginPage");
    console.log("Logging in as:", role);
    console.log("Email:", email);
    console.log("Password:", password);

    // Redirect based on role
    if (role === "learner") {
      navigate("/learner-dashboard");
    } else if (role === "teacher") {
      navigate("/teacher-dashboard");
    }
  };

  // Function for handling provider login (Google, Clever, etc.)
  const handleProviderLogin = (provider) => {
    console.log("Logging in with:", provider);

    // Redirect based on role
    if (role === "learner") {
      navigate("/learner-dashboard");
    } else if (role === "teacher") {
      navigate("/teacher-dashboard");
    }
  };

  // Function for handling signup redirection
  const handleSignupRedirect = () => {
    console.log("Redirecting to signup page..."); // Debugging line
    navigate("/signup");
  };

  return (
    <div className="login-page">
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
        <button className="login-page-button" onClick={handleLoginPageButtonClick}>
          Log in
        </button>
        <p className="forgot-password">
          <a href="#forgot-password">Forgot password?</a>
        </p>
      </div>

      <div className="provider-buttons">
        <button
          className="provider-button google"
          onClick={() => handleProviderLogin("Google")}
        >
          <img src={googleLogo} alt="Google Logo" className="provider-logo" />
          Continue with Google
        </button>
        <button
          className="provider-button clever"
          onClick={() => handleProviderLogin("Clever")}
        >
          <img src={cleverLogo} alt="Clever Logo" className="provider-logo" />
          Continue with Clever
        </button>
        <button
          className="provider-button facebook"
          onClick={() => handleProviderLogin("Facebook")}
        >
          <img src={facebookLogo} alt="Facebook Logo" className="provider-logo" />
          Continue with Facebook
        </button>
        <button
          className="provider-button apple"
          onClick={() => handleProviderLogin("Apple")}
        >
          <img src={appleLogo} alt="Apple Logo" className="provider-logo" />
          Continue with Apple
        </button>
      </div>

      <p className="signup-link">
        Don't have an account?{" "}
        <button
          onClick={handleSignupRedirect}
          style={{ background: "none", border: "none", color: "#4caf50", cursor: "pointer" }}
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default LoginPage;