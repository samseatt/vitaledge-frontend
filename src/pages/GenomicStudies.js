import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { genomicApi } from '../services/axios';
import '../styles/GenomicStudies.css';

const GenomicStudies = () => {
    const { id } = useParams();  // Get patient_id from URL parameters
    const [text, setText] = useState('');
    const [studyUrl, setStudyUrl] = useState('');
    const [message, setMessage] = useState('');
    const [studies, setStudies] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudy, setSelectedStudy] = useState(null); // State to track selected study for details view

    // Fetch the list of studies for the patient
    useEffect(() => {
        const fetchStudies = async () => {
            try {
                const response = await genomicApi.get(`/api/studies/${id}`);
                setStudies(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load studies');
                setLoading(false);
            }
        };
        fetchStudies();
    }, [id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await genomicApi.post(`/api/study/${id}`, {
                text,
                study_url: studyUrl
            });
            setMessage(`Record successfully added: ${JSON.stringify(response.data)}`);
            setText('');
            setStudyUrl('');
            setIsModalOpen(false);
            const updatedStudies = await genomicApi.get(`/api/studies/${id}`);
            setStudies(updatedStudies.data);
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'An unexpected error occurred.');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setText('');
        setStudyUrl('');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    
    return (
        <div className="genomic-studies-container">
            <h2>Genomic Studies for Patient {id}</h2>
            <Link to={`/patients/${id}`} className="back-link">Back to Patient Details</Link>

            {/* Button to open modal */}
            <button onClick={() => setIsModalOpen(true)} className="add-study-button">
                Add Genomic Study
            </button>

            <h3>List of Genomic Studies</h3>
            <ul className="studies-list">
                {studies.map((study) => (
                    <li key={study.study.name} className="study-item">
                        <a href={study.study.url} target="_blank" rel="noopener noreferrer">
                            {study.study.name}
                        </a>
                        <button 
                            className="view-details-button" 
                            onClick={() => setSelectedStudy(study)}
                        >
                            View Study Details
                        </button>
                    </li>
                ))}
            </ul>

            {/* Modal for adding a new genomic study */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add New Genomic Study</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Study Text:</label>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    rows="5"
                                    placeholder="Enter the study text here"
                                    required
                                />
                            </div>
                            <div>
                                <label>Study URL:</label>
                                <input
                                    type="text"
                                    value={studyUrl}
                                    onChange={(e) => setStudyUrl(e.target.value)}
                                    placeholder="Enter the study URL"
                                    required
                                />
                            </div>
                            <button type="submit">Submit</button>
                            <button type="button" onClick={closeModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Display selected study details */}
            {selectedStudy && (
                <div className="study-details">
                    <h3>{selectedStudy.study.name}</h3>
                    <div className="score-details">
                        <p><strong>Genetic Score:</strong> {selectedStudy.score["genetic-score"]}</p>
                        <p><strong>Percentile:</strong> {selectedStudy.score.percentile}</p>
                    </div>
                    <div className="study-summary">
                        <strong>Summary:</strong>
                        <textarea readOnly rows="3" value={selectedStudy.study.summary} />
                    </div>
                    <div className="study-description">
                        <strong>Description:</strong>
                        <textarea readOnly rows="6" value={selectedStudy.study.description} />
                    </div>
                    
                    {/* Variants table */}
                    <h4>Variants</h4>
                    <table className="variants-table">
                        <thead>
                            <tr>
                                <th>Variant</th>
                                <th>Genotype</th>
                                <th>Effect Size</th>
                                <th>Variant Frequency</th>
                                <th>Significance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedStudy.variants.map((variant, index) => (
                                <tr key={index}>
                                    <td>{variant.variant}</td>
                                    <td>{variant.genotype}</td>
                                    <td>{variant["effect-size"]}</td>
                                    <td>{variant["variant-frequency"]}</td>
                                    <td>{variant.significance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default GenomicStudies;
