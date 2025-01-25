import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./learner.css";

const Learner = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [step, setStep] = useState(1);
  const [grade, setGrade] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const handleGradeSelection = (selectedGrade) => {
    setGrade(selectedGrade);
    setStep(2);
  };

  const handleCourseSelection = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleContinue = () => {
    console.log("Selected Grade:", grade);
    console.log("Selected Courses:", selectedCourses);
    setShowPopup(false);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  const handleDonateClick = (e) => {
    e.preventDefault();
    console.log("Donate clicked");
  };

  return (
    <div className="learner-dashboard">
      {/* Conditionally render header, bottom bar, About Us, and Contact sections */}
      {!showPopup && (
        <>
          {/* Fixed Navbar */}
          <header className="learner-navbar">
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
              <Link to="/" className="logo-link">
                <span className="logo-text">Pathshala</span>
              </Link>
            </div>
            <div className="navbar-right">
              <a href="#donate" className="nav-link" onClick={handleDonateClick}>
                Donate
              </a>
              <button className="logout-button" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </header>

          {/* Welcome Section */}
          <div className="welcome-section">
            <p className="welcome-text">Welcome, Learner!</p>
            <a href="#start-learning" className="start-learning-link">
              Start Learning
            </a>
          </div>

          {/* Main Content */}
          <main className="learner-content">
            <h1>Let's get started</h1>
            <p>
              Here, you can explore courses, track your progress, and level up your skills.
            </p>

            {/* Three Vertical Sections */}
            <div className="three-vertical-sections">
              {/* Left Section */}
              <div className="vertical-section left-section">
                <h2>MY STUFF</h2>
                <ul>
                  <li>
                    <a href="#my-courses">My courses</a>
                  </li>
                  <li>
                    <a href="#edit-courses">Edit Courses</a>
                  </li>
                  <li>
                    <a href="#all-for-education">All for education</a>
                  </li>
                  <li>
                    <a href="#see-all">See all (3)</a>
                  </li>
                </ul>
              </div>

              {/* Middle Section */}
              <div className="vertical-section middle-section">
                <h2>MY ACCOUNT</h2>
                <ul>
                  <li>
                    <a href="#getting-started-with-generative-ai">
                      Getting started with generative AI
                    </a>
                  </li>
                  <li>
                    <a href="#start">Start</a>
                  </li>
                  <li>
                    <a href="#progress">Progress</a>
                  </li>
                  <li>
                    <a href="#profile">Profile</a>
                  </li>
                </ul>
              </div>

              {/* Right Section */}
              <div className="vertical-section right-section">
                <h2>TEACHERS</h2>
                <ul>
                  <li>
                    <a href="#getting-ready-to-learn-with-ai">
                      Getting ready to learn with AI
                    </a>
                  </li>
                  <li>
                    <a href="#lesson-plans-ai-literacy">Lesson Plans: AI Literacy</a>
                  </li>
                  <li>
                    <a href="#common-sense-education">Common Sense Education</a>
                  </li>
                  <li>
                    <a href="#add-another-course">Add another course</a>
                  </li>
                </ul>
              </div>
            </div>
          </main>

          {/* About Us Section */}
          <section className="about-us-section">
            <h2>About Us</h2>
            <p>
              Our mission is simple: to break down barriers to education and provide
              opportunities for all. Join us on this journey to make a lasting impact
              in the world of learning.
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
        </>
      )}

      {/* Pop-up Screen */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content bg-white p-4 rounded">
            {/* Step 1: Grade Selection */}
            {step === 1 && (
              <>
                <h2>Personalize Your Learning</h2>
                <div className="grade-section">
                  <p>What grade are you in?</p>
                  <p>We'll gather the right lessons for you.</p>
                </div>
                <div className="row">
                  {/* Primary / Elementary Section */}
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Primary / Elementary</h5>
                        <div className="list-group">
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("Kindergarten/Year 0")}
                          >
                            Kindergarten/Year 0
                          </button>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("Grade 1/Year 1")}
                          >
                            Grade 1/Year 1
                          </button>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("Grade 2/Year 2")}
                          >
                            Grade 2/Year 2
                          </button>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("Grade 3/Year 3")}
                          >
                            Grade 3/Year 3
                          </button>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("Grade 4/Year 4")}
                          >
                            Grade 4/Year 4
                          </button>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("Grade 5/Year 5")}
                          >
                            Grade 5/Year 5
                          </button>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("Grade 6/Year 6")}
                          >
                            Grade 6/Year 6
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary / High School Section */}
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Secondary / High School</h5>
                        <div className="list-group">
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("Grade 7/Year 7")}
                          >
                            Grade 7/Year 7
                          </button>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("Grade 8/Year 8")}
                          >
                            Grade 8/Year 8
                          </button>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("Grade 9/Year 9")}
                          >
                            Grade 9/Year 9
                          </button>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("Grade 10/Year 10")}
                          >
                            Grade 10/Year 10
                          </button>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("Grade 11/Year 11")}
                          >
                            Grade 11/Year 11
                          </button>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("Grade 12/Year 12")}
                          >
                            Grade 12/Year 12
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* University / Adult Learner Section */}
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">University / Adult Learner</h5>
                        <div className="list-group">
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("1st Year University")}
                          >
                            1st Year University
                          </button>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("2nd Year University")}
                          >
                            2nd Year University
                          </button>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("3rd Year University")}
                          >
                            3rd Year University
                          </button>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("4th Year University")}
                          >
                            4th Year University
                          </button>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("Graduate Studies")}
                          >
                            Graduate Studies
                          </button>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGradeSelection("Adult Learner")}
                          >
                            Adult Learner
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="step-footer mt-3">
                  <p>Step 1 of 2</p>
                  <div className="step-button">Choose a grade to continue</div>
                </div>
              </>
            )}

            {/* Step 2: Course Selection */}
            {step === 2 && (
              <>
                <h2>Personalize Your Learning</h2>
                <div className="course-section">
                  <p>What courses can we help you learn?</p>
                  <p>Choose 4-5 and we'll gather the right lessons for you.</p>
                </div>
                <div className="row">
                  {/* Math Section */}
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Math</h5>
                        <div className="list-group">
                          <button
                            className={`list-group-item list-group-item-action ${
                              selectedCourses.includes("Algebra Basics") ? "active" : ""
                            }`}
                            onClick={() => handleCourseSelection("Algebra Basics")}
                          >
                            Algebra Basics
                          </button>
                          <button
                            className={`list-group-item list-group-item-action ${
                              selectedCourses.includes("Statistics and Probability") ? "active" : ""
                            }`}
                            onClick={() => handleCourseSelection("Statistics and Probability")}
                          >
                            Statistics and Probability
                          </button>
                          <button
                            className={`list-group-item list-group-item-action ${
                              selectedCourses.includes("Calculus") ? "active" : ""
                            }`}
                            onClick={() => handleCourseSelection("Calculus")}
                          >
                            Calculus
                          </button>
                          <button
                            className={`list-group-item list-group-item-action ${
                              selectedCourses.includes("Linear Algebra") ? "active" : ""
                            }`}
                            onClick={() => handleCourseSelection("Linear Algebra")}
                          >
                            Linear Algebra
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Science Section */}
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Science</h5>
                        <div className="list-group">
                          <button
                            className={`list-group-item list-group-item-action ${
                              selectedCourses.includes("Biology") ? "active" : ""
                            }`}
                            onClick={() => handleCourseSelection("Biology")}
                          >
                            Biology
                          </button>
                          <button
                            className={`list-group-item list-group-item-action ${
                              selectedCourses.includes("Chemistry") ? "active" : ""
                            }`}
                            onClick={() => handleCourseSelection("Chemistry")}
                          >
                            Chemistry
                          </button>
                          <button
                            className={`list-group-item list-group-item-action ${
                              selectedCourses.includes("Physics") ? "active" : ""
                            }`}
                            onClick={() => handleCourseSelection("Physics")}
                          >
                            Physics
                          </button>
                          <button
                            className={`list-group-item list-group-item-action ${
                              selectedCourses.includes("Environmental Science") ? "active" : ""
                            }`}
                            onClick={() => handleCourseSelection("Environmental Science")}
                          >
                            Environmental Science
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="step-footer mt-3">
                  <p>Step 2 of 2</p>
                  <button className="btn btn-primary" onClick={handleContinue}>
                    Continue
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Learner;