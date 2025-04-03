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
    .orderBy('items.id', 'desc')
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log('Error', err)
      res.status(404).json({
        message: 'The items request could not be filled.'
      })
    })
})

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  knex('items')
    .select('*')
    .where('items.user_id', '=', userId)
    .orderBy('items.id', 'desc')
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log('Error', err)
      res.status(404).json({
        message: 'The items request could not be filled.'
      })
    })
})

app.post('/users', (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  // console.log('username:', username, 'password:', password);

  const newUser = {
    first_name: first_name,
    last_name: last_name,
    username: username,
    password: password
  }

  knex('users')
    .insert(newUser)
    .then(res.status(201).json({
      message: `${newUser.username} was added to the database!`
    }))
    .catch(err => {
      console.log(err);
      res.status(404).json({
        message: `${newUser.username} was NOT added to the database :(`
      })
    })
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // console.log('username:', username, 'password:', password);
  knex('users')
    .select('*')
    .where({username: username})
    .then((user) => {
      // console.log(user);
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

app.post('/items', (req, res) => {
  const {
    user_id,
    item_name,
    description,
    quantity
  } = req.body;

  const newItem = {
    user_id: user_id,
    item_name: item_name,
    description: description,
    quantity: quantity
  }

  knex('items')
    .insert(newItem)
    .then(res.status(201).json({
      message: `${newItem.item_name} was added to the database!`
    }))
    .catch(err => {
      console.log(err);
      res.status(404).json({
        message: `${newItem.item_name} was NOT added to the database :(`
      })
    })
})

app.patch('/items/:id', (req, res) => {
  const itemId = req.params.id;

  const {
    item_name,
    description,
    quantity
  } = req.body;

  const updateItem = {
    item_name: item_name,
    description: description,
    quantity: quantity
  }

  knex('items')
    .where({id: itemId})
    .update(updateItem)
    .returning('*')
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({
          message: 'Item not found.'
        })
      }
      res.status(200).json({
        message: 'Item updated in database!'
      })
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        message: 'There was an error, please try again later.'
      })
    })
})

app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;

  knex('items')
    .where({id: itemId})
    .delete()
    .returning('*')
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({
          message: 'Item not found.'
        })
      }
      res.status(200).json({
        message: 'Item deleted from database!'
      })
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        message: 'There was an error, please try again later.'
      })
    })
})

app.listen(PORT, () => {
  console.log('Server is running on port:', PORT);
})