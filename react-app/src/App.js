import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage"; // Adjust this path if needed
import SignupPage from "./components/SignupPage"; // Import the Signup Page
import Teacher from "./components/teacher/teacher"; // Import the Teacher Dashboard
import Classes from "./components/teacher/Classes"; // Import the Classes component
import Students from "./components/teacher/Students"; // Import the Students component
import Resources from "./components/teacher/Resources"; // Import the Resources component
import "./App.css"; // Main app styling

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the AuthPage (Home Page) */}
          <Route path="/" element={<AuthPage />} />

          {/* Route for the Signup Page */}
          <Route path="/signup" element={<SignupPage />} />

          {/* Route for the Teacher Dashboard */}
          <Route path="/teacher-dashboard" element={<Teacher />} />

          {/* Routes for Classes, Students, and Resources */}
          <Route path="/teacher/classes" element={<Classes />} />
          <Route path="/teacher/students" element={<Students />} />
          <Route path="/teacher/resources" element={<Resources />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;