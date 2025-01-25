import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import "./AuthPage.css";
import smilingImage from "./smiling.png";
import iconImage from "./icon.png"; // Used in why-section
import trustedImage from "./trusted.png"; // Used in why-section
import empowerImage from "./empower.png"; // Used in why-section
import laptopImage from "./laptop.png"; // Used in learners-section
import collegeImage from "./college.png"; // Used in teachers-section

const AuthPage = () => {
  const navigate = useNavigate();

  // State to manage visibility of details for each course
  const [showDetails, setShowDetails] = useState({});

  // Function to toggle details visibility
  const toggleDetails = (course) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [course]: !prevState[course],
    }));
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleDonateClick = (e) => {
    e.preventDefault();
    console.log("Donate clicked");
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    console.log("Explore clicked");
  };

  return (
    <div className="auth-page">
      <header className="navbar">
        <div className="navbar-left">
          <a href="#explore" className="nav-link" onClick={handleExploreClick}>
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
          {/* Wrap the logo-text with a Link */}
          <Link to="/" className="logo-link">
            <span className="logo-text">Pathshala</span>
          </Link>
        </div>
        <div className="navbar-right">
          <a href="#donate" className="nav-link" onClick={handleDonateClick}>
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

      <main className="hero-section">
        <div className="hero-text">
          <h1>For every student, every classroom. Real results.</h1>
          <p>
            We’re a nonprofit with the mission to provide a free, world-class
            education for anyone, anywhere.
          </p>
          <div className="hero-buttons">
            <button className="hero-button" onClick={handleLoginRedirect}>
              Teachers
            </button>
            <button className="hero-button" onClick={handleLoginRedirect}>
              Learners
            </button>
          </div>
        </div>
        <div className="hero-photo">
          <img src={smilingImage} alt="Smiling student" />
        </div>
      </main>

      {/* Explore Our Courses Section */}
      <section className="explore-section">
        <h2>Top Trending</h2>
        <div className="explore-grid">
          {/* Example Course Item */}
          <div className="explore-item">
            <div className="course-header" onClick={() => toggleDetails("Competitive Programming")}>
              <span>Competitive Programming</span>
              <button className="toggle-button">
                {showDetails["Competitive Programming"] ? "▲" : "▼"}
              </button>
            </div>
            {showDetails["Competitive Programming"] && (
              <div className="course-details">
                <p>Programming.</p>
              </div>
            )}
          </div>

          {/* Add more course items similarly */}
          <div className="explore-item">
            <div className="course-header" onClick={() => toggleDetails("Software Development")}>
              <span>Software Development</span>
              <button className="toggle-button">
                {showDetails["Software Development"] ? "▲" : "▼"}
              </button>
            </div>
            {showDetails["Software Development"] && (
              <div className="course-details">
                <p>Mern, Python, Javascript.</p>
              </div>
            )}
          </div>

          <div className="explore-item">
            <div className="course-header" onClick={() => toggleDetails("Mapping")}>
              <span>Mapping</span>
              <button className="toggle-button">
                {showDetails["Mapping"] ? "▲" : "▼"}
              </button>
            </div>
            {showDetails["Mapping"] && (
              <div className="course-details">
                <p>Preparation courses for upcoming challenges.</p>
              </div>
            )}
          </div>

          {/* Add more course items as needed */}
        </div>
      </section>

      {/* Why Pathshala Works Section */}
      <section className="why-section">
        <h2>Why Pathshala works</h2>
        <div className="why-content">
          <div className="why-item">
            <img src={iconImage} alt="Personalized Learning" /> {/* iconImage used here */}
            <h3>Personalized learning</h3>
            <p>
              Students practice at their own pace, first filling in gaps in their
              understanding and then accelerating their learning.
            </p>
          </div>
          <div className="why-item">
            <img src={trustedImage} alt="Trusted Content" /> {/* trustedImage used here */}
            <h3>Trusted content</h3>
            <p>
              Created by experts, Pathshala's library of trusted practice and
              lessons covers math, science, and more. Always free for learners
              and teachers.
            </p>
          </div>
          <div className="why-item">
            <img src={empowerImage} alt="Tools to Empower Teachers" /> {/* empowerImage used here */}
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
            <button className="teachers-button" onClick={handleLoginRedirect}>
              Teachers, start here
            </button>
          </div>
          <div className="teachers-photo">
            <img src={collegeImage} alt="College" /> {/* collegeImage used here */}
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
            <button className="learners-button" onClick={handleLoginRedirect}>
              Learners, start here
            </button>
          </div>
          <div className="learners-photo">
            <img src={laptopImage} alt="Laptop" /> {/* laptopImage used here */}
          </div>
        </div>
      </section>

      {/* New Image Section */}
      <section className="image-section">
        <h2>Join Pathshala Today</h2>
        <div className="image-buttons">
          <button className="image-button" onClick={handleLoginRedirect}>
            Learners
          </button>
          <button className="image-button" onClick={handleLoginRedirect}>
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