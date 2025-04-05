import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logoImage from "../logo.png"; 
import "./Classes.css"; 

const Classes = () => {
  const navigate = useNavigate();
  const email = "kazishahedpoco@example.com";
  const [searchQuery, setSearchQuery] = useState("");

  const handleDonateClick = (e) => {
    e.preventDefault();
    navigate("/donate"); 
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("Searching for:", searchQuery);
    
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const handleCreateClass = () => {
    navigate("/dashboard"); 
  };

  const handleOnboardingClick = () => {
    navigate("/teacher/onboarding");
  };

  const handleShowClick = () => {
    navigate("/auth"); 
  };

  return (
    <div className="classes-dashboard">
   
      <nav className="navbar navbar-expand-lg bg-dark fixed-top">
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
          
            <div className="d-flex align-items-center me-auto">
              <button
                className="btn btn-outline-success me-3 d-lg-none"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasResponsive"
                aria-controls="offcanvasResponsive"
              >
                ☰
              </button>
             
              <div className="input-group search-bar d-none d-lg-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                />
                <button className="btn btn-success" type="button">
                  Search
                </button>
              </div>
            </div>

            
            <Link to="/" className="navbar-brand mx-auto">
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
                onClick={() => navigate("/settings")}
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </nav>

      
      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex="-1"
        id="offcanvasResponsive"
        aria-labelledby="offcanvasResponsiveLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasResponsiveLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <nav className="nav flex-column gap-2">
            <button className="btn btn-outline-light">Explore</button>
            <button
              className="btn btn-outline-light"
              onClick={handleDonateClick}
            >
              Donate
            </button>
           
            <button
              className="btn btn-outline-light"
              onClick={() => navigate("/settings")}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>

      
      <div className="welcome-section">
        <p className="welcome-text">Welcome, {email}</p>
        <a href="#add-school" className="add-school-link">
          Add your University
        </a>
      </div>

      
      <main className="classes-content">
        <div className="main-sections">
          <section className="classes-section">
            <h2>Create a Class</h2>
            <p>
              Get a live view into your students' progress, targeted assignment
              recommendations, and so much more!
            </p>
            <button
              className="create-class-button btn btn-success"
              onClick={handleCreateClass}
            >
              Create a Class
            </button>
          </section>

          <section className="onboarding-section">
            <h2>Continue Onboarding</h2>
            <p>
              Hi, {email}! Continue your Pathshala for Educators onboarding
              here.
            </p>
            <button
              className="btn btn-success"
              onClick={handleOnboardingClick} 
            >
              Get Started
            </button>
          </section>

          <section className="khan-section">
            <h2>Getting to Pathshala</h2>
            <button className="btn btn-success" onClick={handleShowClick}>
              Show
            </button>
          </section>
        </div>

        <div className="help-section">
          <h2>Help and Tips</h2>
          <div className="help-tips">
            <a
              href="https://help.blackboard.com/Learn/Instructor/Original/Assignments/Create_and_Edit_Assignments"
              className="help-tip"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>Making Assignments</h3>
              <p>Create assignments and mastery goals for your students.</p>
            </a>
            <a
              href="https://www.essentialed.com/educators/help/article/what-types-of-reports-can-i-use-for-my-classes-and-students"
              className="help-tip"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>Reporting Options</h3>
              <p>Explore tools to track student performance.</p>
            </a>
            <a
              href="https://www.udemy.com/topic/focus-mastery/?srsltid=AfmBOoq_htKcDskc19Rt6V0QrPEeva5V4WJ4KF0MQTOqDM2SesCYjE0z"
              className="help-tip"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>Courses with Mastery</h3>
              <p>Discover which courses have Mastery enabled.</p>
            </a>
            <a
              href="https://www.khanacademy.org/khan-for-educators/k4e-us-demo/xb78db74671c953a7:using-course-mastery-on-khan-academy-gr/xb78db74671c953a7:using-khan-academy-s-activity/a/celebrate-class-progress-with-the-learnstorm-tracker"
              className="help-tip"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>LearnStorm Tracker</h3>
              <p>Engage your classroom with this tool.</p>
            </a>
          </div>
          <p className="help-center-link">
            Need more help? Visit our <Link to="/help-centre">Help Center</Link>.
          </p>
        </div>
      </main>

      
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
                    <li>
                      <Link
                        to="/support-community"
                        className="text-white text-decoration-none"
                      >
                        Support Community
                      </Link>
                    </li>
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
            <p>© 2025 Pathshala. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Classes;