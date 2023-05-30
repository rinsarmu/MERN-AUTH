process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log(err);
  console.log("Uncaught exception  Shuting down...");
  process.exit(1);
});

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
// dotenv.config({ path: "../.env" });
dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 8000;
console.log("port", process.env.PORT);
console.log("port", process.env.JWT_SECRET);

//Parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Parsing cookies
app.use(cookieParser());

app.use("/hello", (req, res, next) => {});
app.use("/api/users", userRoute);
app.use("*", notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("App is runnign ", PORT);
});
