import React from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";
import smilingImage from "./smiling.png"; // Adjust the path based on where your image is stored
import laptopImage from "./laptop.png"; // Import the laptop image
import iconImage from "./icon.png"; // Import the icon image
import trustedImage from "./trusted.png"; // Import the trusted image
import empowerImage from "./empower.png"; // Import the empower image
import collegeImage from "./college.png"; // Import the college image

const AuthPage = () => {
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    navigate("/signup"); // Redirect to the Signup Page
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to the Login Page
  };

  const handleDonateClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    console.log("Donate clicked");
    // Add your donate logic here (e.g., open a modal, redirect to a donation page, etc.)
  };

  return (
    <div className="auth-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-left">
          <a href="#explore" className="nav-link">
            Explore
          </a>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search here..."
            />
            <button className="search-button">Search</button>
          </div>
        </div>
        <div className="navbar-center">
          <span className="logo-text">Pathshala</span>
        </div>
        <div className="navbar-right">
          <a
            href="#donate" // Keep the href for accessibility, but prevent default behavior
            className="nav-link"
            onClick={handleDonateClick}
          >
            Donate
          </a>
          <button className="login-button" onClick={handleLoginRedirect}>
            Log in
          </button>
          <button className="signup-button" onClick={handleSignupRedirect}>
            Sign up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-text">
          <h1>For every student, every classroom. Real results.</h1>
          <p>
            We’re a nonprofit with the mission to provide a free, world-class
            education for anyone, anywhere.
          </p>
          <div className="hero-buttons">
            <button className="hero-button" onClick={handleSignupRedirect}>
              Teachers
            </button>
            <button className="hero-button" onClick={handleSignupRedirect}>
              Learners
            </button>
          </div>
        </div>
        <div className="hero-photo">
          <img src={smilingImage} alt="Smiling student" />
        </div>
      </main>

      {/* Why Pathshala Works Section */}
      <section className="why-section">
        <h2>Why Pathshala works</h2>
        <div className="why-content">
          <div className="why-item">
            <img src={iconImage} alt="Personalized Learning" />
            <h3>Personalized learning</h3>
            <p>
              Students practice at their own pace, first filling in gaps in their
              understanding and then accelerating their learning.
            </p>
          </div>
          <div className="why-item">
            <img src={trustedImage} alt="Trusted Content" />
            <h3>Trusted content</h3>
            <p>
              Created by experts, Pathshala's library of trusted practice and
              lessons covers math, science, and more. Always free for learners
              and teachers.
            </p>
          </div>
          <div className="why-item">
            <img src={empowerImage} alt="Tools to Empower Teachers" />
            <h3>Tools to empower teachers</h3>
            <p>
              With Pathshala, teachers can identify gaps in their students'
              understanding, tailor instruction, and meet the needs of every
              student.
            </p>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="teachers-section">
        <div className="teachers-content">
          <div className="teachers-text">
            <h2>TEACHERS</h2>
            <h1>Differentiate your classroom and engage every student.</h1>
            <p>
              We empower teachers to support their entire classroom. 90% of US
              teachers who have used Pathshala have found us effective.
            </p>
            <button className="teachers-button" onClick={handleSignupRedirect}>
              Teachers, start here
            </button>
          </div>
          <div className="teachers-photo">
            <img src={collegeImage} alt="College" />
          </div>
        </div>
      </section>

      {/* Learners and Students Section */}
      <section className="learners-section">
        <div className="learners-content">
          <div className="learners-text">
            <h2>LEARNERS AND STUDENTS</h2>
            <p>You can learn anything.</p>
            <p>Build a deep, solid understanding in math, science, and more.</p>
            <button className="learners-button" onClick={handleSignupRedirect}>
              Learners, start here
            </button>
          </div>
          <div className="learners-photo">
            <img src={laptopImage} alt="Laptop" />
          </div>
        </div>
      </section>

      {/* New Image Section */}
      <section className="image-section">
        <h2>Join Pathshala Today</h2>
        <div className="image-buttons">
          <button className="image-button" onClick={handleSignupRedirect}>
            Learners
          </button>
          <button className="image-button" onClick={handleSignupRedirect}>
            Teachers
          </button>
          <button className="image-button" onClick={handleDonateClick}>
            Donate
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
        <h2>About Us</h2>
        <p>
          Our mission is simple: to break down barriers to education and
          provide opportunities for all. Join us on this journey to make a
          lasting impact in the world of learning.
        </p>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>Contact</h2>
        <div className="contact-links">
          <a href="#help-center" className="nav-link">
            Help Centre
          </a>
          <a href="#support-community" className="nav-link">
            Support Community
          </a>
          <a href="#share-story" className="nav-link">
            Share Your Story
          </a>
          <a href="#press" className="nav-link">
            Press
          </a>
        </div>
      </section>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <p>© 2025 Pathshala. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AuthPage;