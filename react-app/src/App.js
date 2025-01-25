import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import AuthPage from "./components/AuthPage"; // Adjust this path if needed
import SignupPage from "./components/SignupPage"; // Import the Signup Page
import Teacher from "./components/teacher/teacher"; // Import the Teacher Dashboard
import Classes from "./components/teacher/Classes"; // Import the Classes component
import Students from "./components/teacher/Students"; // Import the Students component
import Resources from "./components/teacher/Resources"; // Import the Resources component
import "./App.css"; // Main app styling
=======
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import AuthPage from "./components/AuthPage"; // Import AuthPage component
import SignupPage from "./components/SignupPage"; // Import SignupPage component
import LoginPage from "./components/login/loginpage"; // Import LoginPage component
import Teacher from "./components/teacher/teacher"; // Import Teacher component
import Classes from "./components/teacher/Classes"; // Import Classes component
import Students from "./components/teacher/Students"; // Import Students component
import Resources from "./components/teacher/Resources"; // Import Resources component
import "./App.css"; // Import App-specific CSS
>>>>>>> 8df69bb (Login commit)

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default Route (Auth Page) */}
          <Route path="/" element={<AuthPage />} />

          {/* Auth Routes */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/signup" element={<SignupPage />} />
<<<<<<< HEAD

          {/* Route for the Teacher Dashboard */}
          <Route path="/teacher-dashboard" element={<Teacher />} />

          {/* Routes for Classes, Students, and Resources */}
=======
          <Route path="/login" element={<LoginPage />} />

          {/* Teacher Dashboard Routes */}
          <Route path="/teacher-dashboard" element={<Teacher />} />
>>>>>>> 8df69bb (Login commit)
          <Route path="/teacher/classes" element={<Classes />} />
          <Route path="/teacher/students" element={<Students />} />
          <Route path="/teacher/resources" element={<Resources />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;