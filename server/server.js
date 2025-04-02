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

app.get('/items{/:id}', (req, res) => {
  const itemId = req.params.id;
  knex('items')
    .select('*')
    .modify(itemsTable => {
      if (itemId) {
        itemsTable.where('items.id', '=', itemId)
      }
    })
    .orderBy('items.id')
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log('Error', err)
      res.status(404).json({
        message: 'The items request could not be filled.'
      })
    })
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('username:', username, 'password:', password);
  knex('users')
    .select('*')
    .where({username: username})
    .then((user) => {
      console.log(user);
      if (user[0]?.username == username && user[0]?.password == password) {
        res.status(200).json({
          id: user[0].id,
          first_name: user[0].first_name,
          last_name: user[0].last_name,
          login: true,
          message: 'User authenticated'
        })
      } else {
        res.status(200).json({
          login: false,
          message: 'Username or password is incorrect'
        })
      }
    })
})

app.listen(PORT, () => {
  console.log('Server is running on port:', PORT);
})