const analyzeText = (text) => {
  const sentences = text.split(/[.!?]/).filter(Boolean);
  const words = text.split(/\s+/).filter(Boolean);

  const avgSentenceLength =
    words.length / (sentences.length || 1);

  const wordCounts = {};
  words.forEach((word) => {
    const w = word.toLowerCase();
    wordCounts[w] = (wordCounts[w] || 0) + 1;
  });

  const repeatedWords = Object.values(wordCounts).filter(
    (count) => count > 3
  ).length;

  let score = 0.4;
  let explanation = [];

  if (avgSentenceLength > 20) {
    score += 0.15;
    explanation.push("Uniform sentence length");
  }

  if (repeatedWords > 5) {
    score += 0.15;
    explanation.push("High word repetition");
  }

  if (text.length > 800) {
    score += 0.1;
    explanation.push("Long structured response");
  }

  score = Math.min(score, 0.95);

  return { score, explanation };
};

export default analyzeText;