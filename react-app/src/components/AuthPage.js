import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AuthPage.css";
import smilingImage from "./smiling.png";
import iconImage from "./icon.png"; // Used in why-section
import trustedImage from "./trusted.png"; // Used in why-section
import empowerImage from "./empower.png"; // Used in why-section
import laptopImage from "./laptop.png"; // Used in learners-section
import collegeImage from "./college.png"; // Used in teachers-section

const AuthPage = () => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null); // Add this line

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

  const handleCourseClick = (course) => {
    setSelectedCourse(course); // Update the selected course
    navigate(`/course/${course}`);
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

      {/* Updated Explore Our Courses Section */}
      <section className="explore-section">
        <h2>Courses</h2>
        <div className="explore-grid">
          {/* Math Column */}
          <div className="explore-column">
            <div className="explore-item">
              <div className="course-header" onClick={() => toggleDetails("Math: High School & College")}>
                <img src="https://cdn.kastatic.org/genfiles/topic-icons/icons/math.png-444b34-128c.png" alt="Math" />
                <span>Math: High School & College</span>
                <button className="toggle-button">
                  {showDetails["Math: High School & College"] ? "▲" : "▼"}
                </button>
              </div>
              {showDetails["Math: High School & College"] && (
                <div className="course-details">
                  <div className="course-details-grid">
                    {[
                      "Algebra 1",
                      "Statistics & probability",
                      "Geometry",
                      "College algebra",
                      "Algebra 2",
                      "AP®/College Calculus AB",
                      "Integrated math 1",
                      "AP®/College Calculus BC",
                      "Integrated math 2",
                      "AP®/College Statistics",
                      "Integrated math 3",
                      "Multivariable calculus",
                      "Algebra basics",
                      "Differential equations",
                      "Trigonometry",
                      "Linear algebra",
                      "Precalculus",
                      "See all Math",
                    ].map((course) => (
                      <div
                        key={course}
                        onClick={() => handleCourseClick(course)}
                        className={selectedCourse === course ? "selected-course" : ""}
                      >
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Test Prep Column */}
            <div className="explore-item">
              <div className="course-header" onClick={() => toggleDetails("Test Prep")}>
                <img src="https://cdn.kastatic.org/genfiles/topic-icons/icons/test_prep.png-f7c71f-128c.png" alt="Test Prep" />
                <span>Test Prep</span>
                <button className="toggle-button">
                  {showDetails["Test Prep"] ? "▲" : "▼"}
                </button>
              </div>
              {showDetails["Test Prep"] && (
                <div className="course-details">
                  <div className="course-details-grid">
                    {["Digital SAT", "MCAT", "LSAT", "GMAT", "See more"].map((course) => (
                      <div
                        key={course}
                        onClick={() => handleCourseClick(course)}
                        className={selectedCourse === course ? "selected-course" : ""}
                      >
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Computing Column */}
          <div className="explore-column">
            <div className="explore-item">
              <div className="course-header" onClick={() => toggleDetails("Computing")}>
                <img src="https://cdn.kastatic.org/genfiles/topic-icons/icons/computing_orange.png-653676-128c.png" alt="Computing" />
                <span>Computing</span>
                <button className="toggle-button">
                  {showDetails["Computing"] ? "▲" : "▼"}
                </button>
              </div>
              {showDetails["Computing"] && (
                <div className="course-details">
                  <div className="course-details-grid">
                    {[
                      "Intro to CS - Python",
                      "Computer programming",
                      "AP®︎/College Computer Science Principles",
                      "Pixar in a Box",
                      "AP®︎/College Computer Science A",
                      "See all Computing",
                    ].map((course) => (
                      <div
                        key={course}
                        onClick={() => handleCourseClick(course)}
                        className={selectedCourse === course ? "selected-course" : ""}
                      >
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Arts & Humanities Column */}
            <div className="explore-item">
              <div className="course-header" onClick={() => toggleDetails("Arts & Humanities")}>
                <img src="https://cdn.kastatic.org/genfiles/topic-icons/icons/arts_humanities.png-07c77b-128c.png" alt="Arts & Humanities" />
                <span>Arts & Humanities</span>
                <button className="toggle-button">
                  {showDetails["Arts & Humanities"] ? "▲" : "▼"}
                </button>
              </div>
              {showDetails["Arts & Humanities"] && (
                <div className="course-details">
                  <div className="course-details-grid">
                    {["History", "Climate Project", "Art History", "See all Arts & Humanities"].map((course) => (
                      <div
                        key={course}
                        onClick={() => handleCourseClick(course)}
                        className={selectedCourse === course ? "selected-course" : ""}
                      >
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
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