import getPerplexity from "./perplexity.service.js";

const analyzeText = async (text) => {
  try {
    const perplexity = await getPerplexity(text);

    let score = 0.5; // default neutral
    let explanation = [];

    if (perplexity < 60) {
      score = 0.7; // likely AI
      explanation.push("Low linguistic variability (AI-like)");
    } else if (perplexity < 120) {
      score = 0.5;
      explanation.push("Moderate linguistic predictability detected");
    } else {
      score = 0.4; // likely human
      explanation.push("High linguistic variability (human-like)");
    }

    return { score, perplexity, explanation };
  } catch (err) {
    console.error(err);
    return { score: null, perplexity: null, explanation: [] };
  }
};

export default analyzeText;
