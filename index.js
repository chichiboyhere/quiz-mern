import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import multiplicationResultRoute from "./routes/multiplicationResult.js";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js";
import cors from "cors";
import dotenv from "dotenv";
//import corsOptions from "./config/corsOptions.js";

const app = express();

// cors set up
var corsOptions = {
  origin: 'https://mathquiz-7uck.onrender.com',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// app.get('/products/:id', cors(corsOptions), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for only https://mathquiz-7uck.onrender.com.'})
// })
// Connection from backend to Mongo DB


dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
   // console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// middlewares
app.use(cors(corsOptions))
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
    stack: err.stack,
  });
});

// Connection from frontend to backend
app.listen(8080, () => {
    connect();
    //console.log("Connected to backend.");
  });
