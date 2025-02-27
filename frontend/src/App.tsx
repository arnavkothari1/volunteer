import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/login';
import Register from './components/auth/register';
import StudentDashboard from './components/dashboard/student';
import OrganizerDashboard from './components/dashboard/organizer';
import CreateInternship from './components/internships/create';
import Applications from './components/internships/applications';
import ApplicationsList from './components/applications/ApplicationsList';
import ApplicationDetails from './components/applications/ApplicationDetails';
import Create from './components/company/create';
import InternshipDetails from './components/internships/InternshipDetails';
import ApplicationForm from './components/applications/ApplicationForm';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/organizer" element={<OrganizerDashboard />} />
          <Route path="/internships/create" element={<CreateInternship />} />
          <Route path="/internships/:id" element={<InternshipDetails />} />
          <Route path="/internships/:id/applications" element={<ApplicationsList />} />
          <Route path="/applications/:id" element={<ApplicationDetails />} />
          <Route path="/company/create" element={<Create />} />
          <Route path="/internships/:id/apply" element={<ApplicationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
