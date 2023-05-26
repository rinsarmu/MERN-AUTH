import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/user", userRoute);
app.use("*", notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("App is runnign");
});
