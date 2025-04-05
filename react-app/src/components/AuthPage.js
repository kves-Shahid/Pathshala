import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./AuthPage.css";
import logoImage from "./logo.png";
import smilingImage from "./smiling.png";
import iconImage from "./icon.png";
import trustedImage from "./trusted.png";
import empowerImage from "./empower.png";
import laptopImage from "./laptop.png";
import collegeImage from "./college.png";

const AuthPage = () => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState({});
  const navbarRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (navbarRef.current) {
        setNavHeight(navbarRef.current.offsetHeight);
      }
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (navbarRef.current) resizeObserver.observe(navbarRef.current);

    window.addEventListener("resize", handleResize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDetails = (course) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [course]: !prevState[course],
    }));
  };

  const handleSignupRedirect = () => navigate("/signup");
  const handleLoginRedirect = () => navigate("/login");
  const handleDonateClick = (e) => {
    e.preventDefault();
    navigate("/donate"); 
  };
  const handleExploreClick = (e) => {
    e.preventDefault();
    console.log("Explore clicked");
  };
  const handleCourseClick = (course) => {
    navigate(`/course/${course}`);
  };

  return (
    <div className="auth-page" style={{ paddingTop: `${navHeight}px` }}>
      
      <nav
        className="navbar navbar-expand-lg bg-dark fixed-top d-none d-lg-block"
        ref={navbarRef}
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
          
            <div className="d-flex align-items-center me-auto">
              <button
                className="btn btn-outline-success me-3"
                onClick={handleExploreClick}
              >
                Explore
              </button>
              <div className="input-group search-bar">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                />
                <button className="btn btn-success" type="button">
                  Search
                </button>
              </div>
            </div>
            <Link
              to="/"
              className="position-absolute top-50 start-50 translate-middle"
            >
              <img
                src={logoImage}
                alt="Pathshala Logo"
                className="navbar-logo"
                style={{ height: "40px" }}
              />
            </Link>

            
            <div className="d-flex align-items-center ms-auto">
              <button
                className="btn btn-outline-light me-2"
                onClick={handleDonateClick}
              >
                Donate
              </button>
              <button
                className="btn btn-outline-light me-2"
                onClick={handleLoginRedirect}
              >
                Log in
              </button>
              <button
                className="btn btn-success"
                onClick={handleSignupRedirect}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

   
      <nav className="navbar bg-dark fixed-top d-lg-none" ref={navbarRef}>
        <div className="container-fluid">
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
          >
            ☰
          </button>

          <Link to="/" className="navbar-brand">
            <img src={logoImage} alt="Pathshala Logo" className="navbar-logo" />
          </Link>

          <div
            className="offcanvas offcanvas-start bg-dark text-white"
            tabIndex="-1"
            id="mobileMenu"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Menu</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div className="search-bar mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                />
              </div>

              <nav className="nav flex-column gap-2">
                <button
                  className="btn btn-outline-light"
                  onClick={handleExploreClick}
                >
                  Explore
                </button>
                <button
                  className="btn btn-outline-light"
                  onClick={handleDonateClick}
                >
                  Donate
                </button>
                <button
                  className="btn btn-outline-light"
                  onClick={handleLoginRedirect}
                >
                  Log in
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleSignupRedirect}
                >
                  Sign up
                </button>
              </nav>
            </div>
          </div>
        </div>
      </nav>

      <main className="hero-section mt-4">
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

      <section className="explore-section">
        <h2>Courses</h2>
        <div className="explore-grid">
          <div className="explore-column">
            <div className="explore-item">
              <div
                className="course-header"
                onClick={() => toggleDetails("Math: High School & College")}
              >
                <img
                  src="https://cdn.kastatic.org/genfiles/topic-icons/icons/math.png-444b34-128c.png"
                  alt="Math"
                />
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
                      >
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="explore-item">
              <div
                className="course-header"
                onClick={() => toggleDetails("Test Prep")}
              >
                <img
                  src="https://cdn.kastatic.org/genfiles/topic-icons/icons/test_prep.png-f7c71f-128c.png"
                  alt="Test Prep"
                />
                <span>Test Prep</span>
                <button className="toggle-button">
                  {showDetails["Test Prep"] ? "▲" : "▼"}
                </button>
              </div>
              {showDetails["Test Prep"] && (
                <div className="course-details">
                  <div className="course-details-grid">
                    {["Digital SAT", "MCAT", "LSAT", "GMAT", "See more"].map(
                      (course) => (
                        <div
                          key={course}
                          onClick={() => handleCourseClick(course)}
                        >
                          {course}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="explore-column">
            <div className="explore-item">
              <div
                className="course-header"
                onClick={() => toggleDetails("Computing")}
              >
                <img
                  src="https://cdn.kastatic.org/genfiles/topic-icons/icons/computing_orange.png-653676-128c.png"
                  alt="Computing"
                />
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
                      >
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="explore-item">
              <div
                className="course-header"
                onClick={() => toggleDetails("Arts & Humanities")}
              >
                <img
                  src="https://cdn.kastatic.org/genfiles/topic-icons/icons/arts_humanities.png-07c77b-128c.png"
                  alt="Arts & Humanities"
                />
                <span>Arts & Humanities</span>
                <button className="toggle-button">
                  {showDetails["Arts & Humanities"] ? "▲" : "▼"}
                </button>
              </div>
              {showDetails["Arts & Humanities"] && (
                <div className="course-details">
                  <div className="course-details-grid">
                    {[
                      "History",
                      "Climate Project",
                      "Art History",
                      "See all Arts & Humanities",
                    ].map((course) => (
                      <div
                        key={course}
                        onClick={() => handleCourseClick(course)}
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

      <section className="why-section">
        <h2>Why Pathshala works</h2>
        <div className="why-content">
          <div className="why-item">
            <img src={iconImage} alt="Personalized Learning" />
            <h3>Personalized learning</h3>
            <p>
              Students practice at their own pace, first filling in gaps in
              their understanding and then accelerating their learning.
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
            <img src={collegeImage} alt="College" />
          </div>
        </div>
      </section>

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
            <img src={laptopImage} alt="Laptop" />
          </div>
        </div>
      </section>

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

     
      <footer className="footer bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card bg-dark border-0">
                <div className="card-body">
                  <h5 className="card-title">About Us</h5>
                  <p className="card-text">
                    Our mission is simple: to break down barriers to education
                    and provide opportunities for all. Join us on this journey
                    to make a lasting impact in the world of learning.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card bg-dark border-0">
                <div className="card-body">
                  <h5 className="card-title">Contact</h5>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        to="/help-centre"
                        className="text-white text-decoration-none"
                      >
                        Help Centre
                      </Link>
                    </li>
                    <Link
                      to="/support-community"
                      className="text-white text-decoration-none"
                    >
                      Support Community
                    </Link>
                    <li>
                      <Link
                        to="/share-story"
                        className="text-white text-decoration-none"
                      >
                        Share Your Story
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/press"
                        className="text-white text-decoration-none"
                      >
                        Press
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card bg-dark border-0">
                <div className="card-body">
                  <h5 className="card-title">Follow Us</h5>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        href="https://facebook.com"
                        className="text-white text-decoration-none"
                      >
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com"
                        className="text-white text-decoration-none"
                      >
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://instagram.com"
                        className="text-white text-decoration-none"
                      >
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://linkedin.com"
                        className="text-white text-decoration-none"
                      >
                        LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="mb-0">© 2025 Pathshala. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthPage;