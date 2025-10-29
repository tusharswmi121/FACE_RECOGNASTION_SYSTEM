import React from 'react';
import EnrollForm from './components/EnrollForm';
import VerifyForm from './components/VerifyForm';
import './index.css';

export default function App() {
  return (
    <div style={{ maxWidth: 720, margin: '20px auto', padding: 16 }}>
      <h1 >Family Face Recognition</h1>
      <p>Enroll people with their photo (we store a 128-D face encoding), then verify.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
        <EnrollForm />
        <VerifyForm />
      </div>
    </div>
  );
}
