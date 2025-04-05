import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logoImage from "../logo.png";
import "./teacher.css";

const Teacher = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); 
        return;
      }

      try {
        console.log("Validating token:", token); 
        const response = await axios.get("/api/v1/user/validate-token", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Token validation response:", response.data);

        if (response.data.success) {
          setLoading(false);
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setError("Invalid or expired token. Please log in again.");
        if (error.response?.status === 401) {
          localStorage.removeItem("token"); 
          navigate("/login"); 
        }
      }
    };

    validateToken();
  }, [navigate]);

  const handleDonateClick = (e) => {
    e.preventDefault();
    navigate("/donate"); 
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>; 
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="teacher-dashboard">
      
      <nav className="navbar navbar-expand-lg bg-dark fixed-top d-none d-lg-block">
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
            <div className="d-flex align-items-center me-auto">
              <button className="btn btn-outline-success me-3">Explore</button>
              <div className="input-group search-bar">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                />
                <button className="btn btn-success">Search</button>
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
                onClick={() => navigate("/settings")}
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </nav>

      
      <nav className="navbar bg-dark fixed-top d-lg-none">
        <div className="container-fluid">
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#teacherMobileMenu"
            aria-label="Toggle navigation"
          >
            <span className="visually-hidden">Toggle navigation</span>☰
          </button>
          <Link to="/" className="navbar-brand">
            <img src={logoImage} alt="Pathshala Logo" className="navbar-logo" />
          </Link>
          <div
            className="offcanvas offcanvas-start bg-dark text-white"
            tabIndex="-1"
            id="teacherMobileMenu"
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
        </div>
      </nav>

      
      <div className="welcome-section">
        <p className="welcome-text">Welcome, Teacher</p>
        <a href="#add-school" className="add-school-link">
          Add your University
        </a>
      </div>

      <main className="teacher-content">
        
        <div className="dashboard-cards row justify-content-center">
          <div className="col-md-4 mb-4">
            <div
              className="dashboard-card"
              onClick={() => navigate("/teacher/classes")}
            >
              <h3>Classes</h3>
              <p>View and manage your classes</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              className="dashboard-card"
              onClick={() => navigate("/teacher/students")}
            >
              <h3>Students</h3>
              <p>Track student progress</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              className="dashboard-card"
              onClick={() => navigate("/teacher/resources")}
            >
              <h3>Resources</h3>
              <p>Teaching materials</p>
            </div>
          </div>
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
                    to make a lasting impact in the world of learning
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

export default Teacher;