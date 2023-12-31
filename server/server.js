// server/index.js
const path = require('path');
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// get all TODOS
app.get('/todos/:userEmail', async (req, res) => {
  const { userEmail } = req.params;
  try {
    const todos = await pool.query('SELECT * FROM todoapp.todos WHERE user_email = $1', [userEmail]);
    res.json(todos.rows);
  } catch (err) {
    console.error(`GET /todos error: ${err}`);
    res.status(500).send(err);
  }
});

// create TODO
app.post('/todos', async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  const id = uuidv4();

  try {
    const newTodo = await pool.query(`INSERT INTO todoapp.todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
      [id, user_email, title, progress, date]);
    res.json(newTodo);
  } catch (err) {
    console.error(`POST /todos error: ${err}`);
    res.status(500).send(err);
  }
});

// edit TODO
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;

  try {
    const updatedTodo = await pool.query(`UPDATE todoapp.todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;`,
      [user_email, title, progress, date, id]);
    res.json(updatedTodo);
  } catch (err) {
    console.error(`PUT /todos error: ${err}`);
    res.status(500).send(err);
  }
});

// delete TODO
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await pool.query(`DELETE FROM todoapp.todos WHERE id = $1;`, [id]);
    res.json(deletedTodo);
  } catch (err) {
    console.error(`DELETE /todos error: ${err}`);
    res.status(500).send(err);
  }
});

// signup
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const newUser = await pool.query(`INSERT INTO todoapp.users(email, hashed_password) VALUES($1, $2)`,
      [email, hashedPassword]);

    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
    res.json({ email, token });
  } catch (err) {
    console.error(`POST /signup error: ${err}`);
    res.json({ detail: err.detail });
  }
});

// login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM todoapp.users WHERE email = $1', [email]);

    if (!user.rows.length) {
      return res.json({ detail: 'User does not exits.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.rows[0].hashed_password);

    if (passwordMatch) {
      const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
      res.json({ 'email': user.rows[0].email, token });
    } else {
      res.json({ detail: 'Login failed.' });
    }
  } catch (err) {
    console.error(`POST /login error: ${err}`);
    res.json({ detail: err.detail });
  }
});

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});