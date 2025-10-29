import { Person } from '../models/personModel.js';
import { getEmbeddingForImage } from '../services/embeddingService.js';
import { ENV } from '../config/env.js';

function euclidean(a, b) {
  if (a.length !== b.length) return Infinity;
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const diff = a[i] - b[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

export async function verifyFace(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: 'Image file required' });

    const currentEmbedding = await getEmbeddingForImage(req.file.path);
    const persons = await Person.find();

    if (persons.length === 0)
      return res.json({ matched: false, message: 'No enrolled persons yet' });

    let best = { name: null, distance: Infinity };
    for (const person of persons) {
      const dist = euclidean(currentEmbedding, person.encoding);
      if (dist < best.distance) best = { name: person.name, distance: dist };
    }

    const matched = best.distance <= ENV.MATCH_THRESHOLD;
    res.json({
      matched,
      person: matched ? best.name : null,
      distance: Number(best.distance.toFixed(4)),
      threshold: ENV.MATCH_THRESHOLD
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
