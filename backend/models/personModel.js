import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  encoding: { type: [Number], required: true }, // 128-D vector
  createdAt: { type: Date, default: Date.now }
});

export const Person = mongoose.model('Person', personSchema);
