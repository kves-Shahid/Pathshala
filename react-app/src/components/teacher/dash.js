import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link, NavLink } from "react-router-dom"; // Import NavLink
import "bootstrap/dist/css/bootstrap.min.css";
import logoImage from "../logo.png";
import "./dash.css";
import { Pencil } from "react-bootstrap-icons";

const Dash = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the class ID from the URL
  const [showSidebar, setShowSidebar] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [file, setFile] = useState(null); // State to store the uploaded file

  // Fetch the class details based on the ID (you can replace this with actual data fetching logic)
  const classDetails = {
    id: id,
    name: "Mathematics 101", // Replace with dynamic data
    section: "Section A",
    subject: "Mathematics",
    room: "Room 101",
  };

  const handleDonateClick = (e) => {
    e.preventDefault();
    navigate("/donate");
  };

  const handleAddAnnouncement = () => {
    if (newAnnouncement.trim() || file) {
      const announcement = {
        text: newAnnouncement,
        file: file ? URL.createObjectURL(file) : null, // Generate Blob URL for the file
        fileType: file ? file.type : null, // Store file type (e.g., video/mp4, audio/mp3, text/plain)
      };
      setAnnouncements([...announcements, announcement]);
      setNewAnnouncement("");
      setFile(null); // Clear the file input after posting
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
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
    <div className="dashboard">
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
            <div className="d-flex align-items-center ms-auto">
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
              to={`/class/${id}`} // Dynamic path with class ID
              className="nav-link"
              activeClassName="active"
            >
              Stream
            </NavLink>
            <NavLink
              to="/teacher/classwork"
              className="nav-link"
              activeClassName="active"
            >
              Classwork
            </NavLink>
            <NavLink
              to="/teacher/people"
              className="nav-link"
              activeClassName="active"
            >
              People
            </NavLink>
            <NavLink to="/marks" className="nav-link" activeClassName="active">
              Marks
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Sidebar - Included directly in the Dash component */}
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
              to={`/class/${id}`} // Dynamic path with class ID
              className="nav-link text-white"
              activeClassName="active"
            >
              Stream
            </NavLink>
            <NavLink
              to={`/class/${id}/classwork`}
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? "active-sidebar" : ""}`
              }
            >
              Classwork
            </NavLink>
            <Link to="/teacher/people" className="nav-link text-white">
              {" "}
              {/* Updated */}
              People
            </Link>
            <Link to="/marks" className="nav-link text-white">
              Marks
            </Link>
            <hr className="text-white" />
            <h6 className="text-white">Stream</h6>
            <Link to="/to-review" className="nav-link text-white">
              To Review
            </Link>
            <hr className="text-white" />
            <h6 className="text-white">Classwork</h6>
            <Link to="/settings" className="nav-link text-white">
              Settings
            </Link>
            <hr className="text-white" />
            <h6 className="text-white">People</h6>
            <Link to="/settings" className="nav-link text-white">
              Settings
            </Link>
            <hr className="text-white" />
            <h6 className="text-white">Marks</h6>
            <Link to="/settings" className="nav-link text-white">
              Settings
            </Link>
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
              {/* Customize Section - Moved to the top */}
              <div className="card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Customize</h5>
                    <button className="btn btn-outline-success">
                      <Pencil /> {/* Pencil icon */}
                    </button>
                  </div>
                  <div
                    className="blank-box"
                    style={{
                      height: "150px",
                      border: "1px dashed #ccc",
                      borderRadius: "8px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Stream</h5>
                  <p className="card-text">Announce something to your class</p>
                  <p className="card-text">
                    <strong>Class code:</strong> 7evppy4
                  </p>
                  <div className="d-flex flex-column gap-2">
                    <button className="btn btn-success">View all</button>
                    <button className="btn btn-success">Stream settings</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Upcoming</h5>
                  <p className="card-text">No work due in soon</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Classwork</h5>
                  <p className="card-text">Manage assignments and materials</p>
                  {/* Updated Classwork Button */}
                  <button
                    className="btn btn-success"
                    onClick={() => navigate("/teacher/classwork")}
                  >
                    View Classwork
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">People</h5>
                  <p className="card-text">Manage students and co-teachers</p>
                  {/* Updated People Button */}
                  <button
                    className="btn btn-success"
                    onClick={() => navigate("/teacher/people")} // Add navigation
                  >
                    View people
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Marks</h5>
                  <p className="card-text">View and manage student grades</p>
                  <button className="btn btn-success">View marks</button>
                </div>
              </div>
            </div>
          </div>
          {/* Announcement Section */}
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Announcements</h5>
                  <div className="announcement-form mb-3">
                    <textarea
                      className="form-control mb-2"
                      rows="3"
                      placeholder="Write an announcement..."
                      value={newAnnouncement}
                      onChange={(e) => setNewAnnouncement(e.target.value)}
                    ></textarea>
                    <input
                      type="file"
                      className="form-control mb-2"
                      onChange={handleFileChange}
                      accept="video/*, audio/*, text/*"
                    />
                    <button
                      className="btn btn-success"
                      onClick={handleAddAnnouncement}
                    >
                      Post Announcement
                    </button>
                  </div>
                  {/* Scrollable Content Section */}
                  <div
                    className="scrollable-content"
                    style={{
                      maxHeight: "400px",
                      overflowY: "auto",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "10px",
                    }}
                  >
                    {announcements.map((announcement, index) => (
                      <div key={index} className="announcement-item mb-3">
                        <p>{announcement.text}</p>
                        {announcement.file && (
                          <div className="file-preview">
                            {announcement.fileType.startsWith("video") ? (
                              <video controls width="100%">
                                <source
                                  src={announcement.file}
                                  type={announcement.fileType}
                                />
                                Your browser does not support the video tag.
                              </video>
                            ) : announcement.fileType.startsWith("audio") ? (
                              <audio controls>
                                <source
                                  src={announcement.file}
                                  type={announcement.fileType}
                                />
                                Your browser does not support the audio tag.
                              </audio>
                            ) : (
                              <a
                                href={announcement.file}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Text File
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
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

export default Dash;