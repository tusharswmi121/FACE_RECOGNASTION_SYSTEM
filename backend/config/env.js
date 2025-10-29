import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5001,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/family_face',
  MATCH_THRESHOLD: Number(process.env.MATCH_THRESHOLD || 0.6),
  PYTHON_BIN: process.env.PYTHON_BIN || 'python3'
};
