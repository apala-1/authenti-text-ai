import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { text } = location.state || { text: "" };

  const [loading, setLoading] = useState(true);
  const [aiLikelihood, setAiLikelihood] = useState("--");
  const [explanations, setExplanations] = useState([]);
  const [reasoning, setReasoning] = useState([]);
  const [limitations, setLimitations] = useState([]);
  const [intendedUse, setIntendedUse] = useState("");

  useEffect(() => {
    if (!text) {
      navigate("/");
      return;
    }

    const fetchPrediction = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        const data = await res.json();

        // Map score to user-friendly likelihood
        let likelihoodLabel = "N/A";
        if (typeof data.score === "number" && !isNaN(data.score)) {
          if (data.score >= 0.7) likelihoodLabel = "High";
          else if (data.score >= 0.5) likelihoodLabel = "Medium";
          else likelihoodLabel = "Low";
        }
        setAiLikelihood(likelihoodLabel);

        // Dynamic reasoning based on score
        let reasoningArr = [];
        if (data.score >= 0.7) reasoningArr.push("Text patterns strongly resemble AI-generated writing");
        else if (data.score >= 0.5) reasoningArr.push("Text has some AI-like patterns");
        else reasoningArr.push("Text mostly looks human-written");
        setReasoning(reasoningArr);

        // Friendly explanations
        const friendlyExplanations = (data.explanation || []).map((exp) => {
          exp = exp.toLowerCase();
          if (exp.includes("repetitive")) return "Repetitive phrases detected";
          if (exp.includes("uniform")) return "Sentences are very uniform in length";
          if (exp.includes("variability")) return "Sentence patterns resemble human writing";
          return exp;
        });
        setExplanations(friendlyExplanations);

        setLimitations(data.limitations || []);
        setIntendedUse(data.intendedUse || "");
        setLoading(false);
      } catch (err) {
        console.error(err);
        setAiLikelihood("Error");
        setReasoning([]);
        setExplanations(["Failed to fetch backend prediction."]);
        setLimitations([]);
        setIntendedUse("");
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [text, navigate]);

  // Color coding
  const likelihoodColor = () => {
    if (aiLikelihood === "High") return "#e74c3c"; // red
    if (aiLikelihood === "Medium") return "#f39c12"; // orange
    if (aiLikelihood === "Low") return "#27ae60"; // green
    return "black";
  };

  // Inline styles
  const containerStyle = {
    maxWidth: "700px",
    margin: "2rem auto",
    padding: "1.5rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  };

  const textBoxStyle = {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    whiteSpace: "pre-wrap",
    textAlign: "left",
  };

  const sectionStyle = {
    textAlign: "left",
    margin: "1rem 0",
    backgroundColor: "#fff",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #eee",
  };

  const noteStyle = {
    fontSize: "0.9rem",
    color: "#555",
    margin: "0.5rem 0",
  };

  const buttonStyle = {
    marginTop: "1rem",
    padding: "0.6rem 1.2rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3498db",
    color: "white",
    cursor: "pointer",
    transition: "background 0.2s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#2980b9",
  };

  return (
    <div style={containerStyle}>
      <h1>AuthentiText AI</h1>

      <p><strong>Input Text:</strong></p>
      <div style={textBoxStyle}>{text}</div>

      {loading ? (
        <p style={{ fontStyle: "italic", color: "#555" }}>Analyzing text, please wait...</p>
      ) : (
        <>
          <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
            <strong>AI Likelihood:</strong>{" "}
            <span style={{ color: likelihoodColor(), fontWeight: "bold" }}>
              {aiLikelihood}
            </span>
          </p>

          {reasoning.length > 0 && (
            <div style={sectionStyle}>
              <p><strong>Why we think so:</strong></p>
              <ul>
                {reasoning.map((r, idx) => <li key={idx}>{r}</li>)}
              </ul>
            </div>
          )}

          {limitations.length > 0 && <p style={noteStyle}>⚠️ Note: {limitations.join("; ")}</p>}
          {intendedUse && <p style={noteStyle}>ℹ️ {intendedUse}</p>}
        </>
      )}

      <button
        onClick={() => navigate("/")}
        style={buttonStyle}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
      >
        Check Another Text
      </button>
    </div>
  );
};

export default Result;
