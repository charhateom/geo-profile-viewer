import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProfilesProvider } from './contexts/ProfilesContext';
import HomePage from './pages/HomePage';
import ProfileDetailPage from './pages/ProfileDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <ProfilesProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile/:id" element={<ProfileDetailPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ProfilesProvider>
  );
}

export default App;