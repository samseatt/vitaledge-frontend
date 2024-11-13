import React, { useState } from 'react';

const AddVitalModal = ({ heartRate, systolic, diastolic, onClose, onSave }) => {
  // Local state for the input fields
  const [localHeartRate, setLocalHeartRate] = useState(heartRate || '');
  const [localSystolic, setLocalSystolic] = useState(systolic || '');
  const [localDiastolic, setLocalDiastolic] = useState(diastolic || '');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    onSave({
      heartRate: localHeartRate,
      systolic: localSystolic,
      diastolic: localDiastolic,
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add New Vital Signs</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Heart Rate:
            <input
              type="number"
              value={localHeartRate}
              onChange={(e) => setLocalHeartRate(e.target.value)}
              required
            />
          </label>
          <label>
            Systolic Blood Pressure:
            <input
              type="number"
              value={localSystolic}
              onChange={(e) => setLocalSystolic(e.target.value)}
              required
            />
          </label>
          <label>
            Diastolic Blood Pressure:
            <input
              type="number"
              value={localDiastolic}
              onChange={(e) => setLocalDiastolic(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddVitalModal;
