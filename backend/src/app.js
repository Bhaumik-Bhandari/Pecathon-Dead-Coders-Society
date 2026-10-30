import express from "express";
import cors from "cors";
import watchtowerRoutes from "./routes/watchtowerRoutes.js";
import spiritLensRoutes from "./routes/spiritLensRoutes.js";
import skyViewRoutes from "./routes/skyViewRoutes.js";

const app = express();

app.use(
  cors({
    origin:
      process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Watchtower backend is running",
  });
});

app.use("/api/watchtower", watchtowerRoutes);
app.use("/api/spirit-lens", spiritLensRoutes);
app.use("/api/skyview", skyViewRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});


export default app;