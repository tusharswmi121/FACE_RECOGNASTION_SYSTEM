import axios from 'axios';

// Adjust if your backend runs elsewhere:
export const api = axios.create({
  baseURL: 'http://localhost:5001/api'
});

export async function enrollPerson({ name, file }) {
  const form = new FormData();
  form.append('name', name);
  form.append('image', file);
  const { data } = await api.post('/persons', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
}

export async function verifyImage({ file }) {
  const form = new FormData();
  form.append('image', file);
  const { data } = await api.post('/verify', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
}

export async function listPersons() {
  const { data } = await api.get('/persons');
  return data;
}
