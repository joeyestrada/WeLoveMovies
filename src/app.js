if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")

// Routers Import
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

// Errors Import
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

// But I know this one!
app.use(cors())

// Still don't know what this does :D
app.use(express.json());

// Routers
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// Errors
app.use(notFound);
app.use(errorHandler);

module.exports = app;
