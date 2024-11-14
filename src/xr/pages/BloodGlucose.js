// src/pages/BloodGlucose.js
import React from 'react';
import Timeseries3D from '../components/Timeseries3D';
import TestXR from './TestXR';

// Example data format for glucose and insulin measurements over time
const sampleData = [
  { x: 0, y: 2, z: -3 },
  { x: 1, y: 1, z: -3 },
  { x: 2, y: 1, z: -3 },
  { x: 4, y: 4, z: -2 },
  // Add more data points as needed
];

function BloodGlucose() {
  return (
    <div className="BloodGlucose">
      <h1>Blood Glucose 3D Timeseries Visualization</h1>
      <Timeseries3D data={sampleData} />
    </div>
  );
}

export default BloodGlucose;
