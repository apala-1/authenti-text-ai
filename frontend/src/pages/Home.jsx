import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

const Home = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

const handleSubmit = () => {
  if (!text.trim()) {
    alert("Please enter some text!");
    return;
  }
  setLoading(true);
  navigate("/result", { state: { text } });
};
<button onClick={handleSubmit} disabled={loading}>
  {loading ? "Checking..." : "Check Text"}
</button>

  return (
    <div className="container">
      <h1>AuthentiText AI</h1>
      <p>Paste text below to check if it is AI-generated.</p>
      <textarea
        rows="10"
        placeholder="Enter your text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit}>Check Text</button>
      <p className="disclaimer">
        ⚠️ Predictions are assistive only. May not be 100% accurate.
      </p>
    </div>
  );
};

export default Home;
