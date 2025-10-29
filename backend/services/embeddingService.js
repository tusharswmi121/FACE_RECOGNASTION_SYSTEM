import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { ENV } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PY_DIR = path.join(__dirname, '..', 'python');
const EMBED_SCRIPT = path.join(PY_DIR, 'embed.py');

/**
 * Call Python script to generate 128-D face embedding for an image.
 * @param {string} imagePath - Absolute path to image file.
 * @returns {Promise<number[]>} 128-D embedding as JS array of floats.
 */
export function getEmbeddingForImage(imagePath) {
  return new Promise((resolve, reject) => {
    const py = spawn(ENV.PYTHON_BIN, [EMBED_SCRIPT, '--image', imagePath], {
      cwd: PY_DIR
    });

    let stdout = '';
    let stderr = '';

    py.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    py.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    py.on('close', (code) => {
      if (code !== 0) {
        console.error('Python error:', stderr);
        return reject(new Error(`embed.py exited with code ${code}`));
      }

      try {
        const parsed = JSON.parse(stdout.trim());
        if (!parsed.embedding || !Array.isArray(parsed.embedding)) {
          throw new Error('Invalid JSON returned from Python');
        }
        resolve(parsed.embedding);
      } catch (err) {
        console.error('Failed to parse embedding JSON:', err.message);
        reject(err);
      }
    });

    py.on('error', (err) => {
      console.error('Failed to start Python process:', err.message);
      reject(err);
    });
  });
}
