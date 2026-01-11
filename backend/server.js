// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("AuthentiText AI Backend Running");
});

// placeholder predict route
app.post("/predict", (req, res) => {
  const { text } = req.body;
  res.json({ score: 0.5, explanation: ["placeholder"] });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));