const db = require('../db');

module.exports = {
  // adds new project
  createProject: (req, res) => {
    const createProjectQuery = `INSERT INTO projects
      (title, tagline, description, funding, deadline, auth_id)
      VALUES ($1, $2, $3, $4, $5, $6)`;
    db.query(createProjectQuery, Object.values(req.body), (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log(data);
        res.status(201).json({
          status: "success",
          data: {
            project: data.rows[0],
          },
        });
      }
    });
  },

  // Get all projects
  getAllProjects: (req, res) => {
    db.query('SELECT * FROM projects', (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data.rows);
      }
    });
  },

  // selects one project
  getProject: (req, res) => {
    db.query('SELECT * FROM projects WHERE id = $1', [req.params.id], (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data.rows);
      }
    });
  },

  // updates a project
  updateProject: (req, res) => {
    const updateProjectQuery = `UPDATE projects
      SET (
        title,
        tagline,
        description,
        funding,
        deadline,
        auth_id
      ) = (
        $2, $3, $4, $5, $6)
      WHERE auth_id = $1`;
    const values = [req.params.id, ...Object.values(req.body)];
    db.query(updateProjectQuery, values, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json({
          status: 'success',
          data: {
            project: data.rows[0],
          },
        });
      }
    });
  },

  // deletes a project
  deleteProject: (req, res) => {
    db.query('DELETE FROM projects where id = $1', req.params.id, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).json({
          status: 'success',
        });
      }
    });
  }

  // // add project funding
  // fundProject: (req, res) => {
  //   const newFunding = await db.query(
  //     "INSERT INTO users_projects (project_id, users_id, funding) values ($1, $2, $3) returning *;",
  //     [req.params.id, req.body.project_id, req.body.users_id, req.body.funding]
  //   );
  //   console.log(fund);
  //   res.status(201).json({
  //     status: "success",
  //     data: {
  //       project: fund.rows[0],
  //     },
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
};
