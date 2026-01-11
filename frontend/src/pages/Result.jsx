import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style.css";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { text } = location.state || { text: "" };

  const [score, setScore] = useState("--");
  const [explanations, setExplanations] = useState([]);

  useEffect(() => {
    if (!text) {
      navigate("/");
      return;
    }
    // Demo: random score + explanation
    const randomScore = (Math.random() * 100).toFixed(2);
    setScore(randomScore + "%");

    setExplanations([
      "Repetition detected",
      "Uniform sentence length",
      "High perplexity",
    ]);
  }, [text, navigate]);

  return (
    <div className="container">
      <h1>Result</h1>

      <p>
        <strong>Input Text:</strong>
      </p>
      <div className="text-box">{text}</div>

      <p>
        <strong>AI Likelihood:</strong> {score}
      </p>

      <p>
        <strong>Explanation:</strong>
      </p>
      <ul>
        {explanations.map((exp, idx) => (
          <li key={idx}>{exp}</li>
        ))}
      </ul>

      <p className="disclaimer">
        ⚠️ Predictions are assistive only. Some human text may appear
        AI-generated and vice versa.
      </p>

      <button onClick={() => navigate("/")}>Check Another Text</button>
    </div>
  );
};

export default Result;
