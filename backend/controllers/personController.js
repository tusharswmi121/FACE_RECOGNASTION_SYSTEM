import { Person } from '../models/personModel.js';
import { getEmbeddingForImage } from '../services/embeddingService.js';

export async function enrollPerson(req, res) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    if (!req.file) return res.status(400).json({ error: 'Image file is required' });

    const embedding = await getEmbeddingForImage(req.file.path);

    const person = new Person({ name, encoding: embedding });
    await person.save();

    res.status(201).json({ id: person._id, name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export async function listPersons(req, res) {
  try {
    const persons = await Person.find({}, { name: 1 });
    res.json(persons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
