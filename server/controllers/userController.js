const db = require('../models');
const {
  getUserQuery, createUserQuery, updateUserQuery,
} = require('./userQueries');

module.exports = {
  // adds new user
  createUser: (req, res) => {
    console.log('called', req.body);
    db.query(createUserQuery, Object.values(req.body))
      .then(data => {
        res.status(200).send(data);

      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message
        });
      });
  },

  // selects one user
  getUser: (req, res) => {
    const { auth_id } = req.body;
      db.query(getUserQuery, Object.values(req.body), (insertErr) => {
        if (insertErr) {
          res.status(500).send(insertErr);
        } else {
          res.status(200).send(false);
        }
      });
  },

  // updates a user
  updateUser: (req, res) => {
    const { auth_id } = req.body;
      db.query(updateUserQuery, Object.values(req.body), (insertErr) => {
        if (insertErr) {
          res.status(500).send(insertErr);
        } else {
          res.status(200).send(false);
        }
      });
  },

  // checks if user exists in table. If not, add new user and return false. If so, return subscribed
  postUser: (req, res) => {
    const { auth_id } = req.body;
    db.query(selectStatus, [auth_id], (statusErr, statusData) => {
      if (statusErr) {
        res.status(500).send(statusErr);
      } else if (!statusData.rows[0].exists) {
        db.query(insertNewUser, Object.values(req.body), (insertErr) => {
          if (insertErr) {
            res.status(500).send(insertErr);
          } else {
            res.status(200).send(false);
          }
        });
      } else {
        db.query(selectSubscribed, [auth_id], (subscribedErr, subscribedData) => {
          if (subscribedErr) {
            res.status(500).send(subscribedErr);
          } else {
            res.status(200).send(subscribedData.rows[0].subscribed);
          }
        });
      }
    });
  }
};
