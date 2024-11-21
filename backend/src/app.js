const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use({ path: "/", routes: routes });

module.exports = app;
