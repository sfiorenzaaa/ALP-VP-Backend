import express from "express";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";
import { publicRouter } from "./routes/public-api";
import { privateRouter } from "./routes/private-api";

const app = express();

// Manual CORS middleware (no dependency)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.use("/api", publicRouter);
app.use("/api", privateRouter)
app.use(errorHandler);

export default app;
