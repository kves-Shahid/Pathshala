import React, { useState } from "react";
import { Link, useNavigate, useParams, NavLink } from "react-router-dom"; // Import NavLink and useParams
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./classwork.css";
import logoImage from "../logo.png";

const Classwork = () => {
  const { id } = useParams(); // Get the class ID from the URL
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [attachmentType, setAttachmentType] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Modal handlers
  const handleCreateClick = () => setShowCreateModal(true);
  const handleCloseModal = () => {
    setShowCreateModal(false);
    setActiveModal(null);
    setAttachmentType(null);
    setFile(null);
  };

  const handleMainOptionClick = (type) => {
    setActiveModal(type);
    setShowCreateModal(false);
  };

  // Assignment handlers
  const handleAddAssignment = (assignment) => {
    setAssignments([...assignments, assignment]);
    handleCloseModal();
  };

  // Attachment handlers
  const handleAttachmentClick = (type) => {
    setAttachmentType(type);
    if (type === "upload") {
      const fileUploadInput = document.getElementById("file-upload");
      if (fileUploadInput) {
        fileUploadInput.click();
      } else {
        console.error("File upload input element not found!");
      }
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Backdrop click handler
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleCloseModal();
  };

  const handleDonateClick = () => {
    navigate("/donate");
  };

  return (
    <div className="classwork-page">
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

      {/* Top Bar */}
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
            <Link to="/teacher/dash" className="nav-link text-white">
              Stream
            </Link>
            <Link
              to="/teacher/classwork"
              className="nav-link text-white active"
            >
              Classwork
            </Link>
            <Link to="/teacher/students" className="nav-link text-white">
              People
            </Link>
            <Link to="/teacher/marks" className="nav-link text-white">
              Marks
            </Link>
            <div className="d-lg-none mt-3">
              <button
                className="btn btn-outline-light w-100 mb-2"
                onClick={handleDonateClick}
              >
                Donate
              </button>
              {/* Settings Button in Mobile Menu */}
              <button
                className="btn btn-outline-light w-100"
                onClick={() => navigate("/settings")}
              >
                Settings
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="classwork-content">
        <div className="content-container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Classwork</h2>
            <button className="btn btn-success" onClick={handleCreateClick}>
              Create
            </button>
          </div>
          <div className="scrollable-content">
            {assignments.length === 0 ? (
              <div className="empty-state text-center">
                <p className="text-muted">
                  This is where you'll assign work. You can add assignments and
                  other work for the class, then organize it into topics.
                </p>
              </div>
            ) : (
              assignments.map((assignment, index) => (
                <div key={index} className="assignment-item mb-3">
                  <h4>{assignment.title}</h4>
                  <p>{assignment.instructions}</p>
                  {assignment.dueDate && <p>Due Date: {assignment.dueDate}</p>}
                  {assignment.attachment && (
                    <div className="attachment">
                      <a
                        href={assignment.attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {assignment.attachment.type === "video"
                          ? "Watch Video"
                          : "View File"}
                      </a>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="create-modal" onClick={handleBackdropClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <div className="create-options">
                <button
                  className="option-btn"
                  onClick={() => handleMainOptionClick("assignment")}
                >
                  <i className="bi bi-file-earmark-plus"></i>
                  Assignment
                </button>
                <button
                  className="option-btn"
                  onClick={() => handleMainOptionClick("quiz")}
                >
                  <i className="bi bi-question-square"></i>
                  Quiz assignment
                </button>
                <button
                  className="option-btn"
                  onClick={() => handleMainOptionClick("material")}
                >
                  <i className="bi bi-file-text"></i>
                  Material
                </button>
                <button
                  className="option-btn"
                  onClick={() => handleMainOptionClick("reuse")}
                >
                  <i className="bi bi-recycle"></i>
                  Reuse post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Content Modal */}
      {activeModal && (
        <div className="create-modal" onClick={handleBackdropClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title text-capitalize">
                {activeModal.replace("-", " ")}
              </h5>
            </div>
            <div className="modal-body">
              {/* Common Fields */}
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" />
              </div>

              {/* Type-specific Fields */}
              {activeModal === "assignment" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Instructions</label>
                    <textarea className="form-control" rows="3" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Attach</label>
                    <div className="d-flex gap-2 flex-wrap">
                      {["drive", "youtube", "upload", "link"].map((type) => (
                        <button
                          key={type}
                          className={`btn btn-outline-secondary ${
                            attachmentType === type ? "active" : ""
                          }`}
                          onClick={() => handleAttachmentClick(type)}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>

                    {attachmentType && (
                      <div className="mt-3">
                        {attachmentType === "upload" ? (
                          <input
                            type="file"
                            id="file-upload"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            placeholder={`Enter ${attachmentType} ${
                              attachmentType === "upload" ? "file" : "link"
                            }`}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeModal === "quiz" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Quiz Questions</label>
                    <textarea className="form-control" rows="5" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input type="date" className="form-control" />
                  </div>
                </>
              )}

              {activeModal === "material" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Material Content</label>
                    <textarea className="form-control" rows="5" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Attach</label>
                    <div className="d-flex gap-2 flex-wrap">
                      {["drive", "youtube", "upload", "link"].map((type) => (
                        <button
                          key={type}
                          className={`btn btn-outline-secondary ${
                            attachmentType === type ? "active" : ""
                          }`}
                          onClick={() => handleAttachmentClick(type)}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>

                    {attachmentType && (
                      <div className="mt-3">
                        {attachmentType === "upload" ? (
                          <input
                            type="file"
                            id="file-upload"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            placeholder={`Enter ${attachmentType} ${
                              attachmentType === "upload" ? "file" : "link"
                            }`}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeModal === "reuse" && (
                <div className="mb-3">
                  <label className="form-label">Select Post to Reuse</label>
                  <select className="form-select">
                    <option>Previous Assignment</option>
                    <option>Previous Quiz</option>
                    <option>Previous Material</option>
                  </select>
                </div>
              )}

              <button
                className="btn btn-success w-100 mt-3"
                onClick={() =>
                  handleAddAssignment({
                    title: "New " + activeModal,
                    type: activeModal,
                    dueDate: document.querySelector(
                      '.modal-body input[type="date"]'
                    ).value,
                    attachment: file
                      ? { url: URL.createObjectURL(file), type: "file" }
                      : null,
                  })
                }
              >
                Create {activeModal.replace("-", " ")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classwork;