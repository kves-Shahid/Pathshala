import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgetpassword.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = () => {
    if (!email.trim()) {
      alert("Please enter a valid email!");
      return;
    }
    console.log("Reset link sent to:", email);
    alert("Password reset link sent to your email!");
    navigate("/login");
  };

  return (
    <div className="forget-password-page">
      <div className="card p-4 forget-password-card">
        <h1 className="text-center mb-4">Reset Password</h1>
        <p className="text-center text-muted mb-4">
          Enter your email to reset your password:
        </p>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary w-100 reset-password-button"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;