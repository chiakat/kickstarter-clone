const db = require('../db');

module.exports = {
  // adds new project
  createProject: (req, res) => {
    console.log('create', req);
    const createProjectQuery = `INSERT INTO projects
      (title, tagline, description, funding_goal, deadline, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)`;
    db.query(createProjectQuery, Object.values(req.body))
      .then(data => res.status(201).send('success: created project'))
      .catch(err => res.status(500).send(err))
  },

  // Get all projects
  getAllProjects: (req, res) => {
    db.query('SELECT * FROM projects')
      .then(data => res.status(200).send(data.rows))
      .catch(err => res.status(500).send(err))
  },

  // selects one project
  getProject: (req, res) => {
    db.query('SELECT * FROM projects WHERE id = $1', [req.params.id])
      .then(data => res.status(200).send(data.rows[0]))
      .catch(err => res.status(500).send(err))
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
        user_id
      ) = (
        $2, $3, $4, $5, $6)
      WHERE user_id = $1`;
    db.query(updateProjectQuery, [req.params.id, ...Object.values(req.body)])
      .then(data => res.status(200).send(data.rows[0]))
      .catch(err => res.status(500).send(err))
  },

  // deletes a project
  deleteProject: (req, res) => {
    db.query('DELETE FROM projects where id = $1', [req.params.id])
      .then(data => res.status(204).send('success: deleted'))
      .catch(err => res.status(500).send(err))
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
