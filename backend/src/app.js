import express from "express";
import cors from "cors";
import watchtowerRoutes from "./routes/watchtowerRoutes.js";
import honorRoutes from "./routes/honorRoutes.cjs";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Watchtower backend is running",
  });
});

app.use("/api/watchtower", watchtowerRoutes);
app.use("/api/honor", honorRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

export default app;