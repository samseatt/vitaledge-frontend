import React, { useEffect, useState } from 'react';
import { standardApi } from '../services/axios'; // Import the genomic API instance
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [feedback, setFeedback] = useState(''); // For success or error messages

  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await standardApi.get('/api/patients');
      setPatients(response.data);
    } catch (err) {
      setError(err.response?.status === 403 ? 'Access denied. Please check your permissions.' : 'Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  const openAddPatientModal = () => setIsModalOpen(true);
  const closeAddPatientModal = () => {
    setIsModalOpen(false);
    setFeedback(''); // Clear feedback when closing the modal
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      await standardApi.post('/api/patients', { name: newName, age: newAge, address: newAddress });
      setFeedback('Patient added successfully!');
      fetchPatients(); // Refetch the patient list
      setNewName('');
      setNewAge('');
      setNewAddress('');
      closeAddPatientModal();
    } catch (err) {
      setFeedback('Failed to add new patient. Please try again.');
    }
  };

  const viewPatient = (id) => navigate(`/patients/${id}`);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button onClick={openAddPatientModal}>Add New Patient</button>

      {feedback && <div className="feedback-message">{feedback}</div>}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Patient</h3>
            <form onSubmit={handleAddPatient}>
              <label>
                Name:
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} required />
              </label>
              <label>
                Age:
                <input type="number" min="0" value={newAge} onChange={(e) => setNewAge(e.target.value)} required />
              </label>
              <label>
                Address:
                <input type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} required />
              </label>
              <button type="submit">Submit</button>
              <button type="button" onClick={closeAddPatientModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.address}</td>
              <td>
                <button onClick={() => viewPatient(patient.id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
