const db = require('../db');

module.exports = {
  // adds new user
  createUser: (req, res) => {
    const createUserQuery = `INSERT INTO users
      (auth_id, username, email)
      VALUES ($1, $2, $3)`;
    db.query(createUserQuery, Object.values(req.body), (err, data) => {
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

  // Get all users
  getAllUsers: (req, res) => {
    db.query('SELECT * FROM users', (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data.rows);
      }
    });
  },

  // selects one user
  getUser: async (req, res) => {
    console.log(req.params.id);
    const {id} = req.params;
    await db.query("SELECT * FROM users WHERE id = $1", [1], (err, data) => {
      if (err) {
        console.log(err)
        res.status(500).send(err);
      } else {
        console.log(data);
        res.status(200).send(data.rows);
      }
    });
  },


  // updates a user
  updateUser: (req, res) => {
    const updateUserQuery = `UPDATE users
      SET (
        first_name,
        last_name,
        cardholder_name,
        card_number,
        card_exp_date,
        billing_address1,
        billing_address2,
        billing_city,
        billing_state,
        billing_postal_code,
        billing_country
      ) = (
        $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      WHERE auth_id = $1`;
      const values = [req.params.id, ...Object.values(req.body)];
    db.query(updateUserQuery, values, (err, data) => {
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


  // // checks if user exists in table. If not, add new user and return false. If so, return subscribed
  // postUser: (req, res) => {
  //   const { auth_id } = req.body;
  //   db.query(selectStatus, [auth_id], (statusErr, statusData) => {
  //     if (statusErr) {
  //       res.status(500).send(statusErr);
  //     } else if (!statusData.rows[0].exists) {
  //       db.query(insertNewUser, Object.values(req.body), (err) => {
  //         if (err) {
  //           res.status(500).send(err);
  //         } else {
  //           res.status(200).send(false);
  //         }
  //       });
  //     } else {
  //       db.query(selectSubscribed, [auth_id], (subscribedErr, subscribedData) => {
  //         if (subscribedErr) {
  //           res.status(500).send(subscribedErr);
  //         } else {
  //           res.status(200).send(subscribedData.rows[0].subscribed);
  //         }
  //       });
  //     }
  //   });
  // }
};
