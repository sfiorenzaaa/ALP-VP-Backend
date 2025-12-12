import express from "express";
import routes from "./routes";
import errorHandler from "./middleware/errorHandler";

const app = express();

// Manual CORS middleware (no dependency)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

export default app;
