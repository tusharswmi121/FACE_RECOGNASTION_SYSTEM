import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';
import personsRoute from './routes/persons.js';
import verifyRoute from './routes/verify.js';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.use('/api/persons', personsRoute);
app.use('/api/verify', verifyRoute);

connectDB();

app.listen(ENV.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${ENV.PORT}`);
});
