import React from "react";
import "./AuthPage.css"; // External CSS file for styling

const AuthPage = () => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          <span className="logo-text">Pathshala</span> {/* Replaced image with text */}
        </a>
      </div>
      <nav className="navbar-center">
        <a href="#explore" className="nav-link">Explore</a>
        <a href="#search" className="nav-link">Search</a>
      </nav>
      <div className="navbar-right">
        <a href="#donate" className="nav-link">Donate</a>
        <a href="#login" className="nav-link">Log in</a>
        <a href="#signup" className="signup-button">Sign up</a>
      </div>
    </header>
  );
};

export default AuthPage;
