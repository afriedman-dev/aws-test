// server/index.js
const path = require('path');
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

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

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});