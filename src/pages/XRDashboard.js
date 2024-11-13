import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { standardApi } from '../services/axios';
import 'aframe';

const XRDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await standardApi.get('/api/patients');
        setPatients(response.data);
        console.log('Patients retrieved from backend:', response.data);
      } catch (err) {
        console.error('Failed to fetch patients', err);
      }
    };

    fetchPatients();
  }, []);

  const handlePatientSelect = (patient) => {
    console.log(`Selected patient: ${patient.name}`);
    setSelectedPatient(patient);
  };

  const goToScene = (scene) => {
    if (selectedPatient) {
      console.log(`Navigating to ${scene} for patient ID ${selectedPatient.id}`);
      navigate(`/xr/${scene}?patientId=${selectedPatient.id}`);
    } else {
      console.warn("Please select a patient before navigating.");
    }
  };

  useEffect(() => {
    // Add click listeners for each patient
    patients.forEach((patient) => {
      const patientElement = document.querySelector(`#patient-${patient.id}`);
      if (patientElement) {
        patientElement.addEventListener('click', () => handlePatientSelect(patient));
        console.log(`Event listener added to patient: ${patient.name}`);
      }
    });

    // Add click listeners for navigation boxes after the patient is selected
    if (selectedPatient) {
      setTimeout(() => {
        const sceneBoxes = [
          { id: 'phenome-box', scene: 'phenome' },
          { id: 'genome-box', scene: 'genome' },
          { id: 'proteome-box', scene: 'proteome' }
        ];

        sceneBoxes.forEach(({ id, scene }) => {
          const boxElement = document.querySelector(`#${id}`);
          if (boxElement) {
            boxElement.addEventListener('click', () => {
              console.log(`Box ${id} clicked, attempting to navigate to ${scene}`);
              goToScene(scene);
            });
            console.log(`Event listener added to ${id}`);
          } else {
            console.warn(`Box ${id} not found in the DOM`);
          }
        });
      }, 100); // Delay to ensure elements are rendered
    }

    // Cleanup listeners on component unmount
    return () => {
      patients.forEach((patient) => {
        const patientElement = document.querySelector(`#patient-${patient.id}`);
        if (patientElement) {
          patientElement.removeEventListener('click', () => handlePatientSelect(patient));
        }
      });

      if (selectedPatient) {
        const sceneBoxes = [
          { id: 'phenome-box', scene: 'phenome' },
          { id: 'genome-box', scene: 'genome' },
          { id: 'proteome-box', scene: 'proteome' }
        ];
        
        sceneBoxes.forEach(({ id, scene }) => {
          const boxElement = document.querySelector(`#${id}`);
          if (boxElement) {
            boxElement.removeEventListener('click', () => goToScene(scene));
          }
        });
      }
    };
  }, [patients, selectedPatient]);

  return (
    <a-scene>
      <a-entity cursor="rayOrigin: mouse" raycaster="objects: [data-raycastable]"></a-entity>

      <a-sky color="#ECECEC"></a-sky>
      <a-camera position="0 1.6 2"></a-camera>

      {patients.map((patient, index) => {
        const angle = (index / patients.length) * 2 * Math.PI;
        const x = Math.cos(angle) * 1.5;
        const z = Math.sin(angle) * 1.5;

        return (
          <a-text
            id={`patient-${patient.id}`}
            key={patient.id}
            value={patient.name}
            color={selectedPatient?.id === patient.id ? 'yellow' : 'black'}
            position={`${x} 1.5 ${z}`}
            rotation="0 0 0"
            width="4"
            data-raycastable
          ></a-text>
        );
      })}

      {selectedPatient && (
        <>
          <a-gltf-model
            id="phenome-box"
            src="/models/human_body.glb"
            position="0 1 -2"
            scale="0.1 0.1 0.1"
            data-raycastable
            onclick={() => goToScene('phenome')}
          >
            <a-text value="Phenome" position="0 0.5 0" align="center" color="#FFFFFF"></a-text>
          </a-gltf-model>
          <a-gltf-model
            id="genome-box"
            src="/models/chromosome_y.glb"
            position="2 1 -2"
            scale="0.005 0.005 0.005"
            data-raycastable
            onclick={() => goToScene('genome')}
          >
            <a-text value="Genome" position="0 0.5 0" align="center" color="#FFFFFF"></a-text>
          </a-gltf-model>
          <a-gltf-model
            id="proteome-box"
            src="/models/cell.glb"
            position="-2 1 -2"
            scale="1 1 1"
            data-raycastable
            onclick={() => goToScene('proteome')}
          >
            <a-text value="Proteome" position="0 0.5 0" align="center" color="#FFFFFF"></a-text>
          </a-gltf-model>
       </>
      )}
    </a-scene>
  );
};

export default XRDashboard;
