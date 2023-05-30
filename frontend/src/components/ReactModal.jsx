import { useState } from 'react';
import crypto from 'crypto';
import Modal from 'react-modal';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generatePassword = () => {
    const randomBytes = crypto.randomBytes(8);
    const generatedPassword = randomBytes.toString('hex');
    setPassword(generatedPassword);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <input type="password" placeholder="Password" onClick={generatePassword} />
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Your generated password is:</h2>
        <p>{password}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}