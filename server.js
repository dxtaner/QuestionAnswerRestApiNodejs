const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routers");
const connectDatabase = require("./helpers/database/connectDatabase.js");

const errorHandler = require("./middlewares/errors/errorHandler.js");


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Environment Variables

dotenv.config({path : "./config/config.env"});



// Routes
app.use("/api",routes);

// MongoDb Connection
connectDatabase();

// Error Handler Middleware
app.use(errorHandler);

// Starting Our Server
app.listen(PORT,() => {
    console.log(`App Started on ${PORT} - Environment : ${process.env.NODE_ENV} `);
});