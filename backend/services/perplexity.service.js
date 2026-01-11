import { execFile } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPerplexity = (text) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(
      __dirname,
      "../python/perplexity.py"
    );

    execFile(
      "python", // or "python3" if needed
      [scriptPath, text],
      { timeout: 8000 },
      (error, stdout, stderr) => {
        if (error) {
          console.error("Python error:", stderr);
          return reject(error);
        }

        const value = parseFloat(stdout);
        if (isNaN(value)) {
          return reject(new Error("Invalid perplexity output"));
        }

        resolve(value);
      }
    );
  });
};

export default getPerplexity;
