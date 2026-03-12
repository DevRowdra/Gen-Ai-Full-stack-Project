require("dotenv").config();
const express = require("express");
const app = express();
// required all the routes here
const authRouter = require("./routers/auth.router");
const globalErrorHandler = require("./middleware/globalErrorHandler.middleware");

app.use(express.json());
// use all the routes here
app.use("/api/auth", authRouter);



// global error handling middleware
app.use(globalErrorHandler);
module.exports = app;
