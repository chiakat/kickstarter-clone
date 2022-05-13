const db = require('../db');

module.exports = {
  // adds new user
  createUser: (req, res) => {
    const createUserQuery = `INSERT INTO users
      (user_id, username, email)
      VALUES ($1, $2, $3)`;
    db.query(createUserQuery, Object.values(req.body))
      .then(data => res.status(201).send(data))
      .catch(err => res.status(500).send(err))
  },

  // Get all users
  getAllUsers: (req, res) => {
    db.query('SELECT * FROM users')
      .then(data => res.status(200).send(data.rows))
      .catch(err => res.status(500).send(err))
  },

  // selects one user
  getUser: async (req, res) => {
    db.query('SELECT * FROM users WHERE id = $1', [req.params.id])
      .then(data => res.status(200).send(data.rows))
      .catch(err => res.status(500).send(err))
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
      WHERE user_id = $1`;
    db.query(updateUserQuery, [req.params.id, ...Object.values(req.body)])
      .then(data => res.status(200).send(data.rows[0]))
      .catch(err => res.status(500).send(err))
  },
};
