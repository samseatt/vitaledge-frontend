// src/pages/TestXR.js
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { standardApi } from '../../services/axios';
import 'aframe';

const TestXR = (data) => {
  const [searchParams] = useSearchParams();

// Rendering sphere 0: x=5, y=120, z=0
// Rendering sphere 1: x=6, y=115, z=1
// Rendering sphere 2: x=7, y=140, z=2
// Rendering sphere 3: x=4, y=100, z=3

  return (
    <a-scene>
      <a-camera position="0 1.6 0"></a-camera>

      <a-sphere
        position={'0 2 -3'}
        radius="0.15"
        color="#FF5733"
        data-raycastable
      >
      </a-sphere>
      
      <a-text
        value={`Genome Visualization for Patient`}
        position="0 2 -3"
        color="#FF00FF"
        width="6"
        align="center"
      ></a-text>

      {/* Check if patient data has loaded */}
      {
          <a-gltf-model
          id="genome-box"
          src="/models/chromosome_y.glb"
          position="0 1 -3"
          scale="0.01 0.01 0.01"
          data-raycastable
          animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
        >
        </a-gltf-model>
      }
    </a-scene>
  );
};

export default TestXR;
