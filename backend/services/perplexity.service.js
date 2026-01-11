import { execFile } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// Fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPerplexity = (text) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "../python/perplexity.py");

    execFile(
      "python",
      [scriptPath, text],
      { maxBuffer: 1024 * 500, timeout: 15000 },
      (error, stdout, stderr) => {
        if (error) return reject(error);

        const perplexity = parseFloat(stdout);
        if (isNaN(perplexity)) {
          return reject(new Error("Perplexity calculation failed"));
        }

        resolve(perplexity);
      }
    );
  });
};

export default getPerplexity;
