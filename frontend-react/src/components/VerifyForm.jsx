import React, { useState } from 'react';
import { verifyImage } from '../api';

export default function VerifyForm() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus('Select an image to verify.');
      return;
    }
    setStatus('Encoding & comparing...');
    setResult(null);
    try {
      const data = await verifyImage({ file });
      setResult(data);
      setStatus('');
    } catch (err) {
      setStatus(err?.response?.data?.error || err.message);
    }
  };

  return (
    <div className="card">
      <h2>Verify Face</h2>
      <form onSubmit={handleVerify}>
        <label>Select Image</label>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0])} />
        <button type="submit">Verify</button>
      </form>
      <p>{status}</p>
      {result && (
        <div style={{ marginTop: 12 }}>
          <div><strong>Matched:</strong> {String(result.matched)}</div>
          <div><strong>Person:</strong> {result.person ?? '—'}</div>
          <div><strong>Distance:</strong> {result.distance}</div>
          <div><strong>Threshold:</strong> {result.threshold}</div>
        </div>
      )}
    </div>
  );
}
