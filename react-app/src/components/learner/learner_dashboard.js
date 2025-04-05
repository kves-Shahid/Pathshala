import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link, NavLink } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import logoImage from "../logo.png";
import "./learner_dashboard.css";

const LearnerDashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showClassworkPopup, setShowClassworkPopup] = useState(false);
  const [showPeoplePopup, setShowPeoplePopup] = useState(false);
  const popupRef = useRef(null);


  const announcements = [];
  const people = [];

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const classResponse = await axios.get(`/api/v1/user/classes/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (classResponse.data.success) {
          setClassDetails(classResponse.data.class);
        }

        const materialsResponse = await axios.get(`/api/v1/material/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (materialsResponse.data.success) {
          setMaterials(materialsResponse.data.materials);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDonateClick = (e) => {
    e.preventDefault();
    navigate("/donate");
  };

  return (
    <div className="learner-dashboard">
    
      <nav className="navbar navbar-expand-lg bg-dark fixed-top">
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
            <button
              className="btn btn-outline-secondary me-3 d-lg-none"
              type="button"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              ☰
            </button>
            <div className="d-flex align-items-center me-auto">
              <div className="input-group search-bar d-none d-lg-flex">
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
            <Link to="/" className="navbar-brand mx-auto">
              <img
                src={logoImage}
                alt="Pathshala Logo"
                className="navbar-logo"
                style={{ height: "40px" }}
              />
            </Link>
            <div className="d-flex align-items-center ms-auto d-none d-lg-flex">
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

      
      <div className="top-bar d-none d-lg-block">
        <div className="d-flex align-items-center">
          <nav className="nav">
            <NavLink
              to={`/learner_dashboard/${id}`}
              className="nav-link"
              activeClassName="active"
            >
              Stream
            </NavLink>
            <NavLink
              to={`/learner_dashboard/${id}/classwork`}
              className="nav-link"
              activeClassName="active"
              onClick={(e) => {
                e.preventDefault();
                setShowClassworkPopup(!showClassworkPopup);
              }}
            >
              Classwork
            </NavLink>
            <NavLink
              to={`/learner_dashboard/${id}/people`}
              className="nav-link"
              activeClassName="active"
              onClick={(e) => {
                e.preventDefault();
                setShowPeoplePopup(!showPeoplePopup);
              }}
            >
              People
            </NavLink>
          </nav>
        </div>

      
        {showClassworkPopup && (
          <div className="classwork-popup" ref={popupRef}>
            <div className="popup-header">
              <h5>Classwork & Announcements</h5>
              <button
                className="btn-close"
                onClick={() => setShowClassworkPopup(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="popup-content">
              <div className="announcements-section">
                <h6>Recent Announcements</h6>
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="announcement-item">
                    <div className="announcement-date">
                      {new Date().toLocaleDateString()}
                    </div>
                    <div className="announcement-content">
                      <p>No announcements available</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showPeoplePopup && (
          <div className="people-popup" ref={popupRef}>
            <div className="popup-header">
              <h5>People</h5>
              <button
                className="btn-close"
                onClick={() => setShowPeoplePopup(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="popup-content">
              <div className="people-section">
                <h6>Teachers</h6>
                {people
                  .filter((person) => person.role === "Teacher")
                  .map((teacher) => (
                    <div key={teacher.id} className="person-item">
                      <p>{teacher.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className={`sidebar bg-dark text-white ${
          showSidebar ? "show" : "hide"
        }`}
      >
        <div className="sidebar-header">
          <h5>Classroom</h5>
        </div>
        <div className="sidebar-body">
          <nav className="nav flex-column">
            <Link to="/home" className="nav-link text-white">
              Home
            </Link>
            <NavLink
              to={`/learner_dashboard/${id}`}
              className="nav-link text-white"
              activeClassName="active"
            >
              Stream
            </NavLink>
            <NavLink
              to={`/learner_dashboard/${id}/classwork`}
              className="nav-link text-white"
              activeClassName="active"
            >
              Classwork
            </NavLink>
            <NavLink
              to={`/learner_dashboard/${id}/people`}
              className="nav-link text-white"
              activeClassName="active"
            >
              People
            </NavLink>
            <button
              className="btn btn-outline-light text-start"
              onClick={handleDonateClick}
            >
              Donate
            </button>
            <button
              className="btn btn-outline-light text-start"
              onClick={() => navigate("/settings")}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>

      
      <main
        className={`dashboard-content ${showSidebar ? "sidebar-open" : ""}`}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h2>{classDetails?.className}</h2>
              <p className="text-muted">Section: {classDetails?.section}</p>
              <p className="text-muted">
                Instructor: {classDetails?.teacherId.name}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Announcements</h5>
                  <div className="announcement-container">
                    {materials.map((material) => (
                      <div
                        key={material._id}
                        className="announcement-item mb-3"
                      >
                        <h6>{material.title}</h6>
                        <p>{material.description}</p>
                        {material.files?.map((file) => (
                          <div key={file.publicId}>
                            {file.type === "image" && (
                              <img src={file.url} alt="Preview" />
                            )}
                            {file.type === "video" && (
                              <video controls>
                                <source src={file.url} type="video/mp4" />
                              </video>
                            )}
                            {file.type === "raw" && (
                              <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View File
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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

export default LearnerDashboard;
