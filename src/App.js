import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientDetails from './pages/PatientDetails';
import GenomicDetails from './pages/GenomicDetails';
import GenomicStudies from './pages/GenomicStudies';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import 'aframe';

// New XR pages
import XRLoginPage from './pages/XRLoginPage';
import XRDashboard from './pages/XRDashboard';
import PhenomeXR from './pages/PhenomeXR';
import GenomeXR from './pages/GenomeXR';
import ProteomeXR from './pages/ProteomeXR';

function App() {
  return (
    <Router>
      <Routes>
        {/* Traditional Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/patients/:id" element={<PrivateRoute><PatientDetails /></PrivateRoute>} />
        <Route path="/patients/:id/genomics" element={<PrivateRoute><GenomicDetails /></PrivateRoute>} />
        <Route path="/patients/:id/genstudy" element={<PrivateRoute><GenomicStudies /></PrivateRoute>} />

        {/* XR Routes */}
        <Route path="/xr" element={<XRLoginPage />} /> {/* XR login route */}
        <Route path="/xr/dashboard" element={<PrivateRoute><XRDashboard /></PrivateRoute>} />
        <Route path="/xr/phenome" element={<PrivateRoute><PhenomeXR /></PrivateRoute>} />
        <Route path="/xr/genome" element={<PrivateRoute><GenomeXR /></PrivateRoute>} />
        <Route path="/xr/proteome" element={<PrivateRoute><ProteomeXR /></PrivateRoute>} />

        <Route path="*" element={<NotFound />} /> {/* Catch-all for undefined paths */}
      </Routes>
    </Router>
  );
}

export default App;
