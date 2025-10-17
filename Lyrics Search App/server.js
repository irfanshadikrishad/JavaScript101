const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Updated to work with version 2.6.7
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

app.get('/api/lyrics', async (req, res) => {
  const { artist, song } = req.query;
  if (!artist || !song) {
    return res.status(400).json({ error: "Please provide both artist and song." });
  }

  try {
    const response = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`);
    const data = await response.json();
    if (data.lyrics) {
      res.json({ artist, song, lyrics: data.lyrics });
    } else {
      res.status(404).json({ error: "Lyrics not found for the given artist and song." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching lyrics from the API." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});