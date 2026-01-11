// backend/controllers/predict.controller.js
import analyzeText from "../services/analyzer.service.js";

export const predictText = async (req, res) => {
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

  let result;
  try {
    result = await analyzeText(text);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "AI analysis failed",
      fallback: "Using heuristic detection only"
    });
  }

  let confidenceLabel = "Low";
  if (result.score >= 0.7) confidenceLabel = "High";
  else if (result.score >= 0.5) confidenceLabel = "Medium";

  res.json({
    score: result.score,
    confidence: confidenceLabel,
    explanation: result.explanation,
    perplexity: result.perplexity ?? null,
    limitations: [
      "Short texts reduce accuracy",
      "AI writing styles evolve over time",
      "False positives are possible"
    ],
    intendedUse: "Assist human judgment, not replace it"
  });
};
