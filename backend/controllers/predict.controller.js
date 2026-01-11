// backend/controllers/predict.controller.js
import analyzeText from "../services/analyzer.service.js";

export const predictText = (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  if (text.trim().length < 30) {
    return res.json({
      score: null,
      explanation: ["Text too short for reliable analysis"],
      warning: "Low confidence due to short input",
    });
  }

  const result = analyzeText(text);

  res.json({
    score: result.score,
    explanation: result.explanation,
    disclaimer: "This is a probabilistic estimate, not a definitive judgment.",
  });
};
