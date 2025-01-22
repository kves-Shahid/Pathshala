// index.js

const express = require('express');
const app = express();
const port = 3000; // You can change this to any port

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, Pathshala!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
