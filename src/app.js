import express from "express";
import cookieParser from "cookie-parser";
import healthCheck from "./controllers/healthcheck.controller.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(cookieParser());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/healthCheck", healthCheck);

app.use("/api", authRouter);

app.use(errorHandler);

export default app;
