import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = () => {
    console.log("Reset password action triggered");
    console.log("Email:", email);
    // Add your reset password logic here
    alert("Password reset link sent to your email!");
    navigate("/login"); // Redirect to login page after reset
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
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
          className="btn btn-primary w-100"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;