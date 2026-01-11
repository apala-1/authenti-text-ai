import getPerplexity from "./perplexity.service.js";

const analyzeText = async (text) => {
  let score = 0.4;
  let explanation = [];

  const perplexity = await getPerplexity(text);

  if (perplexity < 40) {
    score += 0.25;
    explanation.push("Low perplexity typical of AI-generated text");
  } else if (perplexity < 100) {
    score += 0.1;
    explanation.push("Moderate linguistic predictability detected");
  } else {
    explanation.push("High linguistic variability (human-like)");
  }

  score = Math.min(score, 0.95);

  return { score, explanation, perplexity };
};

export default analyzeText;
