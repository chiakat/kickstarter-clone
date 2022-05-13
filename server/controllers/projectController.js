const db = require('../db');

module.exports = {
  // adds new project
  createProject: (req, res) => {
    const createProjectQuery = `INSERT INTO projects
      (title, tagline, details, funding_goal, deadline, img_url, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`;
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
        details,
        funding_goal,
        funding_received,
        deadline,
        img_url,
        user_id
      ) = (
        $2, $3, $4, $5, $6, $7, $8, $9)
      WHERE id = $1`;
    db.query(updateProjectQuery, [req.params.id, ...Object.values(req.body)])
      .then(data => res.status(200).send(data.rows[0]))
      .catch(err => res.status(500).send(err))
  },

    // updates a project funding only
    updateProjectFunding: (req, res) => {
      const updateProjectQuery = `UPDATE projects
        SET funding_received = $2
        WHERE id = $1`;
      db.query(updateProjectQuery, [req.params.id, req.body.newFunding])
        .then(data => res.status(200).send(data.rows[0]))
        .catch(err => res.status(500).send(err))
    },

  // deletes a project
  deleteProject: (req, res) => {
    db.query('DELETE FROM projects where id = $1', [req.params.id])
      .then(data => res.status(204).send('success: deleted'))
      .catch(err => res.status(500).send(err))
  }
};
