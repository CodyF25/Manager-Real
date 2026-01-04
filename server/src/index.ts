import express from "express";
import cors from "cors";
import { initWorld } from "./world";
import { matchRouter } from "./routes/match";
import { managerRouter } from "./routes/manager";
import { clubRouter } from "./routes/club";

const app = express();
app.use(cors());
app.use(express.json());

// In-memory world state for v0
export const world = initWorld();

app.use("/api/match", matchRouter);
app.use("/api/manager", managerRouter);
app.use("/api/club", clubRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
