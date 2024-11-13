import React, { useEffect, useState, useCallback } from 'react';
import { standardApi, aggregatorApi } from '../services/axios'; // Import the genomic API instance
import { useParams, useNavigate, Link } from 'react-router-dom';
import EditPatientModal from '../components/EditPatientModal';
import AddVitalModal from '../components/AddVitalModal';
import '../styles/PatientDetails.css';

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [vitalSigns, setVitalSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editAddress, setEditAddress] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heartRate, setHeartRate] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');

  const navigate = useNavigate();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [documentText, setDocumentText] = useState('');
  const [description, setDescription] = useState('');
  const [fileType, setFileType] = useState('');
  const [documentCategory, setDocumentCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadResponse, setUploadResponse] = useState(null);

  useEffect(() => {
    const fetchPatientAndVitals = async () => {
      setLoading(true);
      try {
        const patientResponse = await standardApi.get(`/api/patients/${id}`);
        const vitalsResponse = await standardApi.get(`/api/patients/${id}/vital-signs`);
        setPatient(patientResponse.data);
        setVitalSigns(vitalsResponse.data);
      } catch (err) {
        setError('Failed to load patient details or vital signs');
      } finally {
        setLoading(false);
      }
    };
    fetchPatientAndVitals();
  }, [id]);

  const openEditPatientModal = () => {
    if (patient) {
      setEditName(patient.name);
      setEditAge(patient.age);
      setEditAddress(patient.address);
      setIsEditModalOpen(true);
    }
  };

  const handleEditPatient = async ({ name, age, address }) => {
    try {
      await standardApi.put(`/api/patients/${id}`, { name, age, address });
      setPatient((prev) => ({ ...prev, name, age, address }));
      setIsEditModalOpen(false);
    } catch (err) {
      setError('Failed to update patient details');
    }
  };
  
  const handleAddVitalSign = async (e) => {
    e.preventDefault();
    try {
      const newVital = {
        heartRate,
        bloodPressureSystolic: systolic,
        bloodPressureDiastolic: diastolic,
        timestamp: new Date().toISOString(),
      };
      const response = await standardApi.post(`/api/patients/${id}/vital-signs`, newVital);
      setVitalSigns(prev => [...prev, response.data]);
      setHeartRate('');
      setSystolic('');
      setDiastolic('');
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to add new vital sign');
    }
  };

  const handleDeleteVitalSign = useCallback(async (vitalSignId) => {
    try {
      await standardApi.delete(`/api/patients/${id}/vital-signs/${vitalSignId}`);
      setVitalSigns(prev => prev.filter(vital => vital.id !== vitalSignId));
    } catch (err) {
      setError('Failed to delete vital sign');
    }
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

    // Open and close modal with state reset on close
    const openUploadModal = () => setIsUploadModalOpen(true);
    const closeModal = () => {
      if (file || documentText.length > 0 || description.length > 0 || fileType || documentCategory) {
        if (window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
          resetForm();
        }
      } else {
        setIsUploadModalOpen(false);
      }
    };
  
    const resetForm = () => {
      setFile(null);
      setDocumentText('');
      setDescription('');
      setFileType('');
      setDocumentCategory('');
      setIsUploadModalOpen(false);
      setErrorMessage('');
    };
  
    // Handle file selection
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    // Handle submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage('');
      
      if (!file && documentText.length < 20) {
        setErrorMessage("Please upload a file or enter at least 20 characters in the document text.");
        return;
      }
      
      if (!fileType || !documentCategory) {
        setErrorMessage("Please select both the file type and document category.");
        return;
      }
  
      const formData = new FormData();
      if (file) formData.append('file', file);
      formData.append('documentText', documentText);
      formData.append('description', description);
      formData.append('fileType', fileType);
      formData.append('documentCategory', documentCategory);
  
      try {
        const response = await aggregatorApi.post(`/api/upload/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setUploadResponse(response.data.message);
        resetForm();
      } catch (err) {
        setErrorMessage('Failed to upload document');
      }
    };
    
  return (
    <div className="patient-details-container">
      <Link to="/dashboard" className="back-link">
        Back to Dashboard
      </Link>
      <h2>Patient Details</h2>
      {patient ? (
        <div className="patient-info">
          <p><strong>ID:</strong> {patient.id}</p>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Address:</strong> {patient.address}</p>
        </div>
      ) : (
        <div>No details available.</div>
      )}

      <button onClick={openEditPatientModal}>Edit Patient Details</button>
      {isEditModalOpen && (
        <EditPatientModal
          name={editName}
          age={editAge}
          address={editAddress}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditPatient}
        />
      )}

      <div className="vital-signs-section">
        <h3>Vital Signs</h3>
        {vitalSigns.length > 0 ? (
          <ul>
            {vitalSigns.map((vital) => (
              <li key={vital.id}>
                <p><strong>Date:</strong> {new Date(vital.timestamp).toLocaleString()}</p>
                <p><strong>Heart Rate:</strong> {vital.heartRate}</p>
                <p><strong>Blood Pressure:</strong> {vital.bloodPressureSystolic}/{vital.bloodPressureDiastolic}</p>
                <button onClick={() => handleDeleteVitalSign(vital.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No vital signs available for this patient.</p>
        )}
      </div>

      <button onClick={() => setIsModalOpen(true)}>Add New Vital Signs</button>
      {isModalOpen && (
        <AddVitalModal
          heartRate={heartRate}
          systolic={systolic}
          diastolic={diastolic}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddVitalSign}
        />
      )}

      {/* Upload Document Button */}
      <button onClick={openUploadModal} className="upload-document-button">
        Upload Document
      </button>

      {/* Modal for Uploading Document */}
      {isUploadModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Upload Document</h3>
            <form onSubmit={handleSubmit}>

              {/* File Upload and Document Text */}
              <div>
                <label>Attach File:</label>
                <input type="file" onChange={handleFileChange} />
                <p>Or paste document text below:</p>
                <textarea
                  rows="5"
                  placeholder="Enter document text here"
                  value={documentText}
                  onChange={(e) => setDocumentText(e.target.value)}
                />
              </div>

              {/* Description Text Area */}
              <div>
                <label>Description / Notes:</label>
                <textarea
                  rows="3"
                  placeholder="Optional description of the document"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Dropdowns for File Type and Document Category */}
              <div>
                <label>File Type:</label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  required
                >
                  <option value="">Select File Type</option>
                  <option value="text">Text</option>
                  <option value="pdf">PDF</option>
                  <option value="tiff">TIFF</option>
                  <option value="png">PNG</option>
                  <option value="gif">GIF</option>
                  <option value="jpeg">JPEG</option>
                  <option value="csv">CSV</option>
                  <option value="zip">ZIP</option>
                  {/* Add more file formats as needed */}
                </select>
              </div>

              <div>
                <label>Document Category:</label>
                <select
                  value={documentCategory}
                  onChange={(e) => setDocumentCategory(e.target.value)}
                  required
                >
                  <option value="">Select Document Category</option>
                  <option value="imaging">Imaging</option>
                  <option value="lab">Lab</option>
                  <option value="ph">Personal Health (PH)</option>
                  <option value="rx">Prescription (Rx)</option>
                  <option value="ehr">Electronic Health Record (EHR)</option>
                  <option value="discharge">Discharge Summary</option>
                  {/* Add more categories as needed */}
                </select>
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="button-group">
                <button type="submit">Submit</button>
                <button type="button" onClick={closeModal}>Cancel</button>
              </div>

            </form>

            {/* Error and Response Messages */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {uploadResponse && <p className="upload-response">{uploadResponse}</p>}
          </div>
        </div>
      )}

      <button onClick={() => navigate(`/patients/${id}/genomics`)}>View Genomic Details</button>
      <button onClick={() => navigate(`/patients/${id}/genstudy`)}>Add Genomic Study</button>
    </div>
  );
};

export default PatientDetails;
