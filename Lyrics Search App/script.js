let resultsVisible = false;

async function searchLyrics() {
  const artist = document.getElementById('artist-input').value.trim();
  const song = document.getElementById('song-input').value.trim();
  const results = document.getElementById('results');
  const error = document.getElementById('error');
  const lyrics = document.getElementById('lyrics');
  const resultTitle = document.getElementById('result-title');
  const recentSearches = document.getElementById('recent-searches');
  const recentList = document.getElementById('recent-list');

  if (!artist || !song) {
    error.textContent = "Please enter both artist and song.";
    error.classList.remove('hidden');
    results.classList.add('hidden');
    return;
  }

  error.classList.add('hidden');
  results.classList.add('hidden');
  console.log(`Fetching: http://localhost:3002/api/lyrics?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}`);
  try {
    const response = await fetch(`http://localhost:3002/api/lyrics?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}`);
    const data = await response.json();
    if (data.error) {
      error.textContent = data.error;
      error.classList.remove('hidden');
    } else {
      resultTitle.textContent = `${data.artist} - ${data.song}`;
      lyrics.textContent = data.lyrics;
      results.classList.remove('hidden');
      results.classList.add('fade-in');

      // Store recent search
      let recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      const searchKey = `${artist.toLowerCase()}_${song.toLowerCase()}`;
      if (!recent.includes(searchKey)) {
        recent.unshift(searchKey);
        if (recent.length > 5) recent.pop();
        localStorage.setItem('recentSearches', JSON.stringify(recent));
        updateRecentSearches();
      }
    }
  } catch (err) {
    error.textContent = "Error fetching lyrics. Check the server or try again.";
    error.classList.remove('hidden');
    console.error(err);
  }
}

function clearFields() {
  document.getElementById('artist-input').value = '';
  document.getElementById('song-input').value = '';
  document.getElementById('results').classList.add('hidden');
  document.getElementById('error').classList.add('hidden');
}

function updateRecentSearches() {
  const recentList = document.getElementById('recent-list');
  const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
  recentList.innerHTML = '';
  if (recent.length > 0) {
    recent.forEach(key => {
      const [artist, song] = key.split('_');
      const li = document.createElement('li');
      li.textContent = `${artist} - ${song}`;
      li.onclick = () => {
        document.getElementById('artist-input').value = artist;
        document.getElementById('song-input').value = song;
      };
      recentList.appendChild(li);
    });
    document.getElementById('recent-searches').classList.remove('hidden');
  } else {
    document.getElementById('recent-searches').classList.add('hidden');
  }
}

document.getElementById('search-btn').onclick = searchLyrics;
document.getElementById('clear-btn').onclick = clearFields;

document.getElementById('artist-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchLyrics();
});

document.getElementById('song-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchLyrics();
});

// Load recent searches on page load
window.onload = updateRecentSearches;