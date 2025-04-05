import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logoImage from "../logo.png";
import "./dash.css";
import { Pencil } from "react-bootstrap-icons";
import { createMaterial, fetchMaterials } from "../../utils/api";

const Dash = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [file, setFile] = useState(null);
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
     
        const classResponse = await fetch(`/api/v1/user/classes/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const classData = await classResponse.json();
        if (classData.success) setClassDetails(classData.class);

      
        const materialsData = await fetchMaterials(id);
        setMaterials(materialsData.materials);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  
  const handleAddAnnouncement = async () => {
    if (!newAnnouncement.trim() && !file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("title", "Announcement");
    formData.append("description", newAnnouncement);
    formData.append("type", "announcement");
    formData.append("classId", id);
    if (file) formData.append("files", file);

    try {
      const response = await createMaterial(formData);
      setMaterials([response.newMaterial, ...materials]);
      setNewAnnouncement("");
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="dashboard">
      
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
                onClick={() => navigate("/donate")}
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
              to={`/class/${id}`}
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

      <div className={`sidebar bg-dark text-white ${showSidebar ? "show" : "hide"}`}>
        <div className="sidebar-header">
          <h5>Classroom</h5>
        </div>
        <div className="sidebar-body">
          <nav className="nav flex-column">
            <Link to="/home" className="nav-link text-white">
              Home
            </Link>
            <NavLink
              to={`/class/${id}`}
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

      
      <main className={`dashboard-content ${showSidebar ? "sidebar-open" : ""}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h2>{classDetails ? classDetails.className : "Loading..."}</h2>
              <div className="card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Customize</h5>
                    <button className="btn btn-outline-success">
                      <Pencil />
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
                    <strong>Class code:</strong> {classDetails ? classDetails.code : "Loading..."}
                  </p>
                  <p className="card-text">
                    <strong>Class ID:</strong> {classDetails ? classDetails._id : "Loading..."}
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
                  <button className="btn btn-success">View assignments</button>
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
                  <button className="btn btn-success">View people</button>
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
                      disabled={loading}
                    >
                      {loading ? "Posting..." : "Post Announcement"}
                    </button>
                  </div>
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
                    {materials.map((material) => (
                      <div key={material._id} className="material-item mb-4 p-3 border rounded">
                        <h5>{material.title}</h5>
                        <p className="text-muted mb-2">
                          {new Date(material.createdAt).toLocaleDateString()}
                        </p>
                        {material.description && (
                          <p className="mb-3">{material.description}</p>
                        )}
                        <div className="file-previews d-flex gap-3">
                          {material.files?.map((file) => (
                            <div key={file.publicId} className="file-preview">
                              {file.type === "image" && (
                                <img
                                  src={file.url}
                                  alt="Preview"
                                  className="img-thumbnail"
                                  style={{ maxWidth: "200px" }}
                                />
                              )}
                              {file.type === "video" && (
                                <video controls style={{ maxWidth: "300px" }}>
                                  <source src={file.url} type="video/mp4" />
                                </video>
                              )}
                              {file.type === "raw" && (
                                <a
                                  href={file.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-outline-primary"
                                >
                                  View File
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
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

export default Dash;