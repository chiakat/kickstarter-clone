require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");
const app = express();
const runProjectsRte = require('./routes/projects');
const runUsersRte = require('./routes/users')

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', runUsersRte);
app.use('/api/projects', runProjectsRte);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});