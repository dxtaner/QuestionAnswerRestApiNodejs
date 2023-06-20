const express = require("express");
const connectDatabase = require("./helpers/database/connectDatabase.js");

const dotenv = require("dotenv");
const routes = require("./routers");
const errorHandler = require("./middlewares/errors/errorHandler.js");

const limitAccess = require("./middlewares/security/limitAccess.js");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Environment Variables
dotenv.config({ path: "./config/config.env" });

// Security
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(
  limitAccess({
    windowMs: 10 * 60 * 500, // 5 Minutes
    max: 500,
  })
);
app.use(hpp());
app.use(cors());

// Routes
app.use("/api", routes);

// MongoDb Connection
connectDatabase();

// Static Files - Uploads
app.use(express.static("public"));

// Error Handler Middleware
app.use(errorHandler);

// Starting Our Server
app.listen(PORT, () => {
  console.log(
    `App Started on ${PORT} - Environment : ${process.env.NODE_ENV} `
  );
});
