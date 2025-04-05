import React, { useState } from 'react';
import './Modal.css'; // Import your CSS for styling

const Modal = ({ message, onCancel, onReauthenticate }) => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    onCancel();
  };

  const handleReauthenticate = () => {
    setShowModal(false);
    onReauthenticate();
  };

  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleReauthenticate}>Re-authenticate</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
