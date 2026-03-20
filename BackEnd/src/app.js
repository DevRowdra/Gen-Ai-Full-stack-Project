require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
// required all the routes here
const authRouter = require("./routers/auth.router");
const globalErrorHandler = require("./middleware/globalErrorHandler.middleware");

app.use(express.json());
// use all the routes here
app.use("/api/auth", authRouter);

app.get("/health", (req, res) => {
  res.send("Welcome to the API");
});
// global error handling middleware
app.use(globalErrorHandler);
module.exports = app;
