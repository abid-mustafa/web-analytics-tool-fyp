const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { getConnectionPool } = require("./database");

const trackingRoutes = require("./controllers/tracking.controller");
const pageRoutes = require("./controllers/pages.controller");
const eventRoutes = require("./controllers/events.controller");

db = getConnectionPool();

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// CORS configuration
app.use(
  cors({
    // origin: ['http://localhost:4200', 'http://localhost:8000'],
    origin: "*",
    methods: "GET, PUT, PATCH, POST, DELETE",
    credentials: false, // change later
  })
);

app.use("/api/tracking", trackingRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/events", eventRoutes);

db.query("SELECT 1")
  .then(() => {
    console.log("Database connection successful.");
    app.listen(3000, () => console.log("Server started at 3000"));
  })
  .catch((err) => console.log("Database connection unsuccessful", err));
