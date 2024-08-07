require('dotenv').config();
const client = require(`./DB/client.js`)
client.connect();
console.log(`Connected to review_app`)
const express = require(`express`);

const app = express();

app.get(`/`, (req, res, next) => {
  res.send(`<h1>Welcome!</h1>`)
})
