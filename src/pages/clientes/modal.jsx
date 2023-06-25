import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    width: '300px',
    height: '200px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const ConfirmationModal = ({ isOpen, onClose, message }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2>{message}</h2>
      <button onClick={onClose}>Cerrar</button>
    </Modal>
  );
};

export default ConfirmationModal;
