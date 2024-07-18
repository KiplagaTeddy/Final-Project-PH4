import React from 'react';

const PatronCard = ({ patron, onEditClick, onDeleteClick }) => {
  return (
    <div className="patron-card">
      <h2>{patron.name}</h2>
      <p>Email: {patron.email}</p>
      <p>Phone: {patron.phone_number}</p>
      <button className="edit" onClick={() => onEditClick(patron)}>Edit</button>
      <button className="delete" onClick={() => onDeleteClick(patron.id)}>Delete</button>
    </div>
  );
};

export default PatronCard;
