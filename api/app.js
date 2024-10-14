const express = require("express");
const cors = require("cors");

const app = express();

// Configure CORS options
var corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:80'], // Allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],     // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],        // Allowed headers
  credentials: true                                         // If you need to send cookies
};

const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


// Test CORS
app.get("/test", cors(corsOptions), (req, res) => {
  res.json({ message: "CORS working fine!" });
});

require("./routes/contacts.routes")(app);
require("./routes/phones.routes")(app);
require("./routes/stats.routes")(app);
require("./routes/company.routes")(app);

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// set port, listen for requests
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});