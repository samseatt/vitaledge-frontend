import React, { useState } from 'react';

const EditPatientModal = ({ name, age, address, onClose, onSave }) => {
  const [editName, setEditName] = useState(name);
  const [editAge, setEditAge] = useState(age);
  const [editAddress, setEditAddress] = useState(address);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default form submission
    onSave({ name: editName, age: editAge, address: editAddress });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Patient Details</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              value={editAge}
              onChange={(e) => setEditAge(e.target.value)}
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
              required
            />
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditPatientModal;
