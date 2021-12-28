const db = require('../models');
const {
  createProjectQuery, getAllProjectsQuery, getProjectQuery, updateProjectQuery, deleteProjectQuery,
} = require('./projectQueries');

module.exports = {
  // adds new project
  createProject: (req, res) => {
    const { auth_id } = req.body;
      db.query(createProjectQuery, Object.values(req.body), (insertErr) => {
        if (insertErr) {
          res.status(500).send(insertErr);
        } else {
          res.status(200).send(false);
        }
      });
  },

  // Get all projects
  getAllProjects: async (req, res) => {
    console.log(req)
    const queryString = `SELECT * from projects`;
    await db.query(queryString, (err, data) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).send(data.rows);
      }
    });
  },

  // selects one project
  getProject: (req, res) => {
    const { auth_id } = req.body;
      db.query(getProjectQuery, Object.values(req.body), (insertErr) => {
        if (insertErr) {
          res.status(500).send(insertErr);
        } else {
          res.status(200).send(false);
        }
      });
  },

  // updates a project
  updateProject: (req, res) => {
    const { auth_id } = req.body;
      db.query(updateProjectQuery, Object.values(req.body), (insertErr) => {
        if (insertErr) {
          res.status(500).send(insertErr);
        } else {
          res.status(200).send(false);
        }
      });
  },

  // deletes a project
  deleteProject: (req, res) => {
    const { auth_id } = req.body;
      db.query(deleteProjectQuery, Object.values(req.body), (insertErr) => {
        if (insertErr) {
          res.status(500).send(insertErr);
        } else {
          res.status(200).send(false);
        }
      });
  }
};
