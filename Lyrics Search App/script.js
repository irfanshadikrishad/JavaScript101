const artistInput = document.getElementById('artist-input');
const songInput = document.getElementById('song-input');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');
const lyricsDisplay = document.getElementById('lyrics-display');
const historyList = document.getElementById('history');

searchBtn.addEventListener('click', searchLyrics);
clearBtn.addEventListener('click', clearAll);
artistInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') searchLyrics(); });
songInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') searchLyrics(); });

loadHistory();

function searchLyrics() {
    const artist = artistInput.value.trim();
    const song = songInput.value.trim();
    if (!artist || !song) {
        lyricsDisplay.innerHTML = '<p>Please enter both artist and song.</p>';
        return;
    }

    fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
        .then(response => {
            if (!response.ok) throw new Error('Lyrics not found');
            return response.json();
        })
        .then(data => {
            if (data.lyrics) {
                lyricsDisplay.innerHTML = `<pre>${data.lyrics}</pre>`;
                addToHistory(artist, song);
            } else {
                lyricsDisplay.innerHTML = '<p>No lyrics available for this song.</p>';
            }
        })
        .catch(error => {
            lyricsDisplay.innerHTML = `<p>Error: ${error.message}. Try checking the spelling or a different song.</p>`;
        });

    artistInput.value = '';
    songInput.value = '';
}

function addToHistory(artist, song) {
    const entry = `${artist} - ${song}`;
    let history = JSON.parse(localStorage.getItem('lyricHistory') || '[]');
    if (!history.includes(entry)) {
        history.unshift(entry);
        if (history.length > 5) history.pop();  // Limit to 5
        localStorage.setItem('lyricHistory', JSON.stringify(history));
        loadHistory();
    }
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('lyricHistory') || '[]');
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        li.addEventListener('click', () => {
            const [artist, song] = item.split(' - ');
            artistInput.value = artist;
            songInput.value = song;
            searchLyrics();
        });
        historyList.appendChild(li);
    });
}

function clearAll() {
    artistInput.value = '';
    songInput.value = '';
    lyricsDisplay.innerHTML = '';
}