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

// Get all projects
app.get("/api/v1/projects", async (req, res) => {
  try {
    //const results = await db.query("select * from projects");
    const projectFundingData = await db.query(
      "select * from projects left join (select project_id, COUNT(*), TRUNC(AVG(funding),1) as average_funding from users group by project_id) users on projects.id = users.project_id;"
    );

    res.status(200).json({
      status: "success",
      results: projectFundingData.rows.length,
      data: {
        projects: projectFundingData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a project
app.get("/api/v1/projects/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const project = await db.query(
      "select * from projects left join (select project_id, COUNT(*), TRUNC(AVG(funding),1) as average_funding from users group by project_id) users on projects.id = users.project_id where id = $1",
      [req.params.id]
    );
    // select * from projects wehre id = req.params.id

    const users = await db.query(
      "select * from users where project_id = $1",
      [req.params.id]
    );
    console.log(users);

    res.status(200).json({
      status: "success",
      data: {
        project: project.rows[0],
        users: users.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a project

app.post("/api/v1/projects", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO projects (title, tagline, funding) values ($1, $2, $3) returning *",
      [req.body.title, req.body.tagline, req.body.funding]
    );
    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        project: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update projects

app.put("/api/v1/projects/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE projects SET title = $1, tagline = $2, funding = $3 where id = $4 returning *",
      [req.body.title, req.body.tagline, req.body.funding, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        project: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

// Delete project

app.delete("/api/v1/projects/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM projects where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});


// add funding for a project
app.patch("/api/v1/projects/:id/fund", async (req, res) => {
  try {
    const newFunding = await db.query(
      "INSERT INTO users_projects (project_id, users_id, funding) values ($1, $2, $3) returning *;",
      [req.params.id, req.body.project_id, req.body.users_id, req.body.funding]
    );
    console.log(fund);
    res.status(201).json({
      status: "success",
      data: {
        project: fund.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});