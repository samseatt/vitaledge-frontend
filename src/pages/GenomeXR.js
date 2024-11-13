// src/pages/GenomeXR.js
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { standardApi } from '../services/axios';
import 'aframe';

const GenomeXR = () => {
  const [patientData, setPatientData] = useState(null);
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId'); // Get patient ID from URL query parameter

  useEffect(() => {
    const fetchPatientGenomeData = async () => {
      try {
        console.log(`Getting genomic data for patient 10`)
        const response = await standardApi.get(`/api/patients/${patientId}`);
        console.log(`Done retrieving genomic data for patient 10`)
        setPatientData(response.data);
      } catch (err) {
        console.error('Error fetching genome data:', err);
      }
    };

    if (patientId) {
      fetchPatientGenomeData();
    }
  }, [patientId]);

  return (
    <a-scene>
      <a-camera position="0 1.6 0"></a-camera>

      {/* Placeholder for Genome Data Visualization */}
      <a-text
        value={`Genome Visualization for Patient ${patientId}`}
        position="0 2 -3"
        color="#FF0000"
        width="6"
        align="center"
      ></a-text>

      {/* Check if patient data has loaded */}
      {patientData ? (
          <a-gltf-model
          id="genome-box"
          src="/models/chromosome_y.glb"
          position="0 1 -3"
          scale="0.01 0.01 0.01"
          data-raycastable
          animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
        >
          <a-text value="Genome Data Loaded" position="0 0.5 0" align="center" color="#FFFFFF"></a-text>
        </a-gltf-model>
      ) : (
        <a-text value="Loading genome data..." position="0 1 -3" color="orange" width="4"></a-text>
      )}
    </a-scene>
  );
};

export default GenomeXR;
