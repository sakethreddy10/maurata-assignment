import React from 'react';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Confirmation</h3>
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="modal-btn yes" onClick={onConfirm}>
            Yes
          </button>
          <button className="modal-btn no" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;