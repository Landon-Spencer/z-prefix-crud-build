const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('API Server is up and running!');
})

app.listen(PORT, () => {
  console.log('Server is running on port:', PORT);
})