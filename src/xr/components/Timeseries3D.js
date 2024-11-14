// src/components/Timeseries3D.js
import React, { useState, useEffect } from 'react';
import 'aframe';

const Timeseries3D = ({ data }) => {
  const [zScale, setZScale] = useState(1);
  const [zOffset, setZOffset] = useState(0);

  const handleZScaleChange = (event) => {
    setZScale(parseFloat(event.target.value));
  };

  const handleZOffsetChange = (event) => {
    setZOffset(parseFloat(event.target.value));
  };

  useEffect(() => {
    // Log each sphere's adjusted position
    data.forEach((point, index) => {
      const adjustedZ = point.z * zScale + zOffset;
      console.log(`Rendering sphere ${index}: x=${point.x}, y=${point.y}, z=${adjustedZ}`);
    });
  }, [data, zScale, zOffset]);

  return (
    <div>
      <label>Z-axis Scale (Time Compression): </label>
      <input
        type="range"
        min="0.1"
        max="3"
        step="0.1"
        value={zScale}
        onChange={handleZScaleChange}
      />
      
      <label>Z-axis Offset (Time Navigation): </label>
      <input
        type="range"
        min="-5"
        max="5"
        step="0.5"
        value={zOffset}
        onChange={handleZOffsetChange}
      />

      <a-scene>
        <a-light type="ambient" color="#FFFFFF" intensity="0.5"></a-light>
        <a-light type="directional" color="#FFFFFF" intensity="0.5" position="1 1 1"></a-light>

        {/* Camera positioned very far back */}
        <a-camera position="4 4 4" look-at="0 0 0"></a-camera>

        {/* Sky and reference grid */}
        <a-sky color="#ECECEC"></a-sky>
        <a-grid color="#333" height="100" width="100" position="0 0 -5" data-raycastable></a-grid>

        {/* Simple box at the origin as a reference point */}
        {/* <a-box position="0 0 0" depth="4" height="4" width="4" color="#DDDDDD" data-raycastable></a-box> */}
        <a-gltf-model
          id="proteome-box"
          src="/models/cell.glb"
          position="0 0 0"
          scale="4 4 4"
          opacity="0.5"
          material="transparent: true"
          data-raycastable
        >
        </a-gltf-model>

        {/* <a-box position="0 0 0" depth="4" height="4" widths="4" color="#DDDDDD" opacity="0.5" material="transparent: true" data-raycastable></a-box> */}

        <a-entity line="start: 0 0 -5; end: 0 0 5; color: #FF0000"></a-entity>
        <a-entity line="start: 0 -5 0; end: 0 5 0; color: #00FF00"></a-entity>
        <a-entity line="start: -5 0 0; end: 5 0 0; color: #0000FF"></a-entity>

        {/* Render data points as spheres */}
        {data.map((point, index) => (
          <a-sphere
            key={index}
            position={`${point.x} ${point.y} ${point.z * zScale + zOffset}`}
            radius="0.15"
            color="#FF5733"
            data-raycastable
          >
            <a-text
              value={`(${point.x}, ${point.y})`}
              position="0 0.3 0"
              align="center"
              color="#000000"
              width="2"
            ></a-text>
          </a-sphere>
        ))}
      </a-scene>
    </div>
  );
};

export default Timeseries3D;
