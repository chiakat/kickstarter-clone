require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");
const app = express();
const runProjectsRte = require('./routes/projects');
const runUsersRte = require('./routes/users')
const stripe = require('stripe')(process.env.STRIPE_SECRET);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// routes
app.use('/api/users', runUsersRte);
app.use('/api/projects', runProjectsRte);

// Stripe API
const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: req.body.name,
          },
          unit_amount: req.body.unit_amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/projects/success`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  console.log(session)
  // res.redirect(303, session.url);
  res.json({url: session.url})
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});