import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css"; // Import the CSS for the Signup Page

// Import logos from the correct path
import googleLogo from "./assets/images/google-logo.png";
import cleverLogo from "./assets/images/clever-logo.jpg";
import facebookLogo from "./assets/images/facebook-logo.png";
import appleLogo from "./assets/images/apple-logo.png";
import emailLogo from "./assets/images/email-logo.png";

const SignupPage = () => {
  const [role, setRole] = useState("learner"); // Track the selected role (learner or teacher)
  const [dob, setDob] = useState({ month: "", day: "", year: "" }); // Track date of birth for learners
  const [email, setEmail] = useState(""); // Track learner's email
  const [username, setUsername] = useState(""); // Track learner's username
  const [password, setPassword] = useState(""); // Track learner's password
  const navigate = useNavigate();

  const handleEmailSignup = () => {
    // Handle email signup logic here
    console.log("Signing up with Email as:", role);
    if (role === "learner") {
      console.log("Date of Birth:", dob);
      console.log("Email:", email);
      console.log("Username:", username);
      console.log("Password:", password);
    }
    // Redirect to the AuthPage after signup
    navigate("/");
  };

  const handleProviderSignup = (provider) => {
    // Handle provider signup logic here
    console.log("Signing up with:", provider);
    // Redirect to the AuthPage after signup
    navigate("/");
  };

  return (
    <div className="signup-page">
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
        <div className="learner-section">
          <h3>We're excited to get you started!</h3>

          {/* Email Input */}
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

          {/* Username Input */}
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

          {/* Password Input */}
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

          {/* Date of Birth Section */}
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
        </div>
      )}

      {/* Provider Buttons (Only for Teachers) */}
      {role === "teacher" && (
        <div className="provider-buttons">
          <button
            className="provider-button google"
            onClick={() => handleProviderSignup("Google")}
          >
            <img src={googleLogo} alt="Google Logo" className="provider-logo" />
            Continue with Google
          </button>
          <button
            className="provider-button clever"
            onClick={() => handleProviderSignup("Clever")}
          >
            <img src={cleverLogo} alt="Clever Logo" className="provider-logo" />
            Continue with Clever
          </button>
          <button
            className="provider-button facebook"
            onClick={() => handleProviderSignup("Facebook")}
          >
            <img
              src={facebookLogo}
              alt="Facebook Logo"
              className="provider-logo"
            />
            Continue with Facebook
          </button>
          <button
            className="provider-button apple"
            onClick={() => handleProviderSignup("Apple")}
          >
            <img src={appleLogo} alt="Apple Logo" className="provider-logo" />
            Continue with Apple
          </button>
        </div>
      )}

      {/* Sign up with Email Button */}
      <button
        className="provider-button email-signup-button"
        onClick={handleEmailSignup}
      >
        <img src={emailLogo} alt="Email Logo" className="provider-logo" />
        Sign up with Email
      </button>

      <p className="login-link">
        Already have an account? <a href="/login">Log in</a>
      </p>

      <p className="terms">
        By signing up for Pathshala, you agree to our{" "}
        <a href="/terms">Terms of use</a> and{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default SignupPage;