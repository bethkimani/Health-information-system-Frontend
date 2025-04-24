import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientForm from './components/ClientForm';
import ProgramForm from './components/ProgramForm';
import ClientSearch from './components/ClientSearch';
import ClientProfile from './components/ClientProfile';
import EnrollClient from './components/EnrollClient';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4 text-white">
          <h1 className="text-2xl font-semibold">Health Information System</h1>
        </nav>
        <div className="p-6">
          <Routes>
            <Route path="/register-client" element={<ClientForm />} />
            <Route path="/create-program" element={<ProgramForm />} />
            <Route path="/search-client" element={<ClientSearch />} />
            <Route path="/client/:id" element={<ClientProfile />} />
            <Route path="/enroll-client" element={<EnrollClient />} />
            <Route path="/" element={<div className="text-center"><h2 className="text-xl">Welcome! Use the navigation to get started.</h2></div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;