// backend/server.js
import express, { json } from "express";
import cors from "cors";

import predictRoutes from "./routes/predict.routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("AuthentiText AI Backend Running");
});

// routes
app.use("/predict", predictRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
