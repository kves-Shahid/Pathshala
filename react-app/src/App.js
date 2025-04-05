import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext"; 
import AuthPage from "./components/AuthPage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/login/loginpage";
import Teacher from "./components/teacher/teacher";
import Classes from "./components/teacher/Classes";
import Classwork from "./components/teacher/classwork";
import Students from "./components/teacher/Students";
import Resources from "./components/teacher/Resources";
import Learner from "./components/learner/learner";
import ForgetPassword from "./components/login/forgetpassword";
import Dashboard from "./components/teacher/dashboard";
import SupportCommunity from "./components/extra/support";
import HelpCenter from "./components/extra/help";
import Press from "./components/extra/press";
import Story from "./components/extra/story";
import Donate from "./components/extra/donate";
import Onboarding from "./components/teacher/onboarding";
import Dash from "./components/teacher/dash";
import LearnerDashboard from "./components/learner/learner_dashboard";
import Settings from "./components/settings/settings"; 
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/teacher-dashboard" element={<Teacher />} />
            <Route path="/teacher/classes" element={<Classes />} />
            <Route path="/teacher/classwork" element={<Classwork />} />
            <Route path="/teacher/students" element={<Students />} />
            <Route path="/teacher/resources" element={<Resources />} />
            <Route path="/learner" element={<Learner />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/support-community" element={<SupportCommunity />} />
            <Route path="/help-centre" element={<HelpCenter />} />
            <Route path="/press" element={<Press />} />
            <Route path="/share-story" element={<Story />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/teacher/onboarding" element={<Onboarding />} />
            <Route path="/teacher/classes/:id" element={<Dash />} />
            <Route path="/teacher/people" element={<Students />} />
            <Route path="/class/:id" element={<Dash />} />
            <Route path="/learner_dashboard/:id" element={<LearnerDashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;