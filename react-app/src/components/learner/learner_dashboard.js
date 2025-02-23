import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logoImage from "../logo.png";
import "./learner_dashboard.css";

const LearnerDashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showClassworkPopup, setShowClassworkPopup] = useState(false);
  const [showPeoplePopup, setShowPeoplePopup] = useState(false); // State for People popup visibility
  const popupRef = useRef(null);

  const classDetails = {
    id: id,
    name: "MATH IV",
    section: "B",
    instructor: "Md. Majibul Hasan Imran",
  };

  const announcements = [
    {
      id: 1,
      date: "2023-10-15",
      section: "Quiz",
      content: [
        "# Monday-Quiz-02",
        "# And I will take extra class in that day In Sha Allah",
        "# Sunday I will be absent (Sorry about that)",
      ],
    },
    {
      id: 2,
      date: "2023-10-16",
      section: "Class Schedule",
      content: [
        "**Md. Majibul Hasan Imran**",
        "Jan 26",
        "Today class : 1:00 PM",
      ],
    },
  ];

  const people = [
    { id: 1, name: "Farhana Islam Nitu", role: "Student" },
    { id: 2, name: "Nafifun Alam Ayon", role: "Student" },
    { id: 3, name: "Pabak Dev", role: "Teacher" },
    { id: 4, name: "Ashfaq Bhuiyan", role: "Teacher" },
    { id: 5, name: "Azad Ragib Nehal", role: "Teacher" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowClassworkPopup(false);
        setShowPeoplePopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDonateClick = (e) => {
    e.preventDefault();
    navigate("/donate");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="learner-dashboard">
      {/* Navbar */}
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
              {/* Settings Button */}
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

      {/* Top Bar - Updated Stream link */}
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

        {/* Classwork Popup */}
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
                      {new Date(announcement.date).toLocaleDateString()}
                    </div>
                    <div className="announcement-content">
                      {announcement.content.map((line, index) => (
                        <p key={index}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="classwork-section">
                <h6>Your Work</h6>
                <p>No assignments yet. Lucky you!</p>
              </div>
            </div>
          </div>
        )}

        {/* People Popup */}
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
                <h6>Classmates</h6>
                {people
                  .filter((person) => person.role === "Student")
                  .map((student) => (
                    <div key={student.id} className="person-item">
                      <p>{student.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
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
              onClick={(e) => {
                e.preventDefault();
                setShowClassworkPopup(!showClassworkPopup);
              }}
            >
              Classwork
            </NavLink>
            <NavLink
              to={`/learner_dashboard/${id}/people`}
              className="nav-link text-white"
              activeClassName="active"
              onClick={(e) => {
                e.preventDefault();
                setShowPeoplePopup(!showPeoplePopup);
              }}
            >
              People
            </NavLink>
            <button
              className="btn btn-outline-light text-start"
              onClick={handleDonateClick}
            >
              Donate
            </button>
            {/* Settings Button in Sidebar */}
            <button
              className="btn btn-outline-light text-start"
              onClick={() => navigate("/settings")}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main
        className={`dashboard-content ${showSidebar ? "sidebar-open" : ""}`}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h2>{classDetails.name}</h2>
              <p className="text-muted">Section: {classDetails.section}</p>
              <p className="text-muted">
                Instructor: {classDetails.instructor}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Upcoming</h5>
                  <p className="card-text">No work due soon.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Classwork</h5>
                  <p className="card-text">View assignments and materials.</p>
                  <button
                    className="btn btn-success"
                    onClick={() => setShowClassworkPopup(!showClassworkPopup)}
                  >
                    View Classwork
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Announcements</h5>
                  <div className="announcement-container position-relative">
                    <div
                      className="announcement-list"
                      style={{
                        maxHeight: "400px",
                        overflowY: "auto",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "10px",
                      }}
                    >
                      {announcements.map((announcement) => (
                        <div
                          key={announcement.id}
                          className="announcement-item mb-3"
                        >
                          <h6>
                            <strong>{announcement.section}</strong> -{" "}
                            {new Date(announcement.date).toLocaleDateString()}
                          </h6>
                          {announcement.content.map((line, index) => (
                            <p key={index}>{line}</p>
                          ))}
                          <hr />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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