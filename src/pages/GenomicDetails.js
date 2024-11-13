import React, { useEffect, useState } from 'react';
import { genomicApi } from '../services/axios'; // Import the genomic API instance
import { useParams, Link } from 'react-router-dom';
import '../styles/GenomicDetails.css';

const GenomicDetails = () => {
  const { id } = useParams(); // Get the patient ID from the URL
  const [rsids, setRsids] = useState([]);
  const [selectedSNP, setSelectedSNP] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch the list of rsIDs for the patient
  useEffect(() => {
    const fetchRsids = async () => {
      try {
        const response = await genomicApi.get(`/api/rsids/10`);
        setRsids(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load rsIDs');
        setLoading(false);
      }
    };
    fetchRsids();
  }, [id]);

  // Function to fetch details of a specific SNP by rsID
  const fetchSNPDetails = async (rsID) => {
    try {
      const response = await genomicApi.get(`/api/snps/10/${rsID}`);
      setSelectedSNP(response.data);
    } catch (err) {
      setError('Failed to load SNP details');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="genomic-details-container">
      <h2>Genomic Details for Patient {id}</h2>
      
      <Link to={`/patients/${id}`} className="back-link">Back to Patient Details</Link>

      <h3>List of Genomic Variants (rsIDs)</h3>
      <ul className="rsid-list">
        {rsids.map((rsid) => (
          <li key={rsid} className="rsid-item">
            <span>{rsid}</span>
            <button 
              className="view-details-button" 
              onClick={() => fetchSNPDetails(rsid)}
            >
              View Variant Details
            </button>
          </li>
        ))}
      </ul>

      {selectedSNP && (
        <div className="snp-details">
          <h3>Details for {selectedSNP.rsID}</h3>
          <table className="snp-details-table">
            <tbody>
              <tr><td>Chromosome</td><td>{selectedSNP.chromosome}</td></tr>
              <tr><td>Position</td><td>{selectedSNP.position}</td></tr>
              <tr><td>Reference Allele</td><td>{selectedSNP.reference_allele}</td></tr>
              <tr><td>Variant Allele</td><td>{selectedSNP.variant_allele}</td></tr>
              <tr><td>Quality</td><td>{selectedSNP.quality}</td></tr>
              <tr><td>Filter</td><td>{selectedSNP.filter}</td></tr>
              {selectedSNP.info && Object.entries(selectedSNP.info).map(([key, value]) => (
                <tr key={key}><td>{key}</td><td>{JSON.stringify(value)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GenomicDetails;
