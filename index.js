import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import multiplicationResultRoute from "./routes/multiplicationResult.js";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js";
import cors from "cors";
//const bodyParser = require('body-parser');

const app = express();


// Connection from backend to Mongo DB

import dotenv from "dotenv";
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json()) 
app.use("/backend/multiplicationResult", multiplicationResultRoute);
app.use("/backend/auth", authRoute);
app.use("/backend/users", usersRoute); 
  
// Handle errors
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    // stack: err.stack,
  });
});

// Connection from frontend to backend
app.listen(8080, () => {
    connect();
    console.log("Connected to backend.");
  });
