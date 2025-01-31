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
        <button className="login-page-button" onClick={handleLoginAction}>
          Log in
        </button>
        <p className="forgot-password">
          <button
            onClick={handleForgotPassword}
            style={{ background: "none", border: "none", color: "#4caf50", cursor: "pointer" }}
          >
            Forgot password?
          </button>
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
            <img src={logo} alt={`${name} Logo`} className="provider-logo" />
            Continue with {name}
          </button>
        ))}
      </div>

      <p className="signup-link">
        Don't have an account?{" "}
        <button
          onClick={handleSignupAction}
          style={{ background: "none", border: "none", color: "#4caf50", cursor: "pointer" }}
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default LoginPage;