const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/api/current-time', (req, res) => {
  res.json({ currentTime: Date.now() });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});