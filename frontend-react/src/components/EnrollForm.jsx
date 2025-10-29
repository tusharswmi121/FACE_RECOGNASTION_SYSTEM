import React, { useState } from 'react';
import { enrollPerson, listPersons } from '../api';

export default function EnrollForm() {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [people, setPeople] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !file) {
      setStatus('Please provide a name and select an image.');
      return;
    }
    setStatus('Uploading & encoding...');
    try {
      await enrollPerson({ name, file });
      setStatus('Enrolled successfully!');
      setName('');
      setFile(null);
      const p = await listPersons();
      setPeople(p);
    } catch (err) {
      setStatus(err?.response?.data?.error || err.message);
    }
  };

  return (
    <div className="card">
      <h2>Enroll Family Person</h2>
      <form onSubmit={handleSubmit}>
        <label>Person Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter person's name"
        />
        <label>Image</label>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0])} />
        <button type="submit">Enroll</button>
      </form>
      <p>{status}</p>
      <div style={{ marginTop: 12 }}>
        <strong>People:</strong>
        <ul>
          {people.map(p => <li key={p.id}>{p.name}</li>)}
        </ul>
      </div>
    </div>
  );
}
