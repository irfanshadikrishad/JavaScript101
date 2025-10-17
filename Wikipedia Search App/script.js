// helper selector
const $ = sel => document.querySelector(sel);

// elements
const q = $('#q');
const searchBtn = $('#searchBtn');
const suggestions = $('#suggestions');
const historyBox = $('#history');
const favoritesBox = $('#favorites');
const titleEl = $('#title'), subtitle = $('#subtitle'), contentEl = $('#content');
const thumb = $('#thumb');
const readTimeEl = $('#readTime');
const readScoreEl = $('#readScore');
const keywordsEl = $('#keywords');
const snippetsEl = $('#snippets');
const headingsEl = $('#headings');
const saveBtn = $('#saveBtn'), readBtn = $('#readBtn'), exportBtn = $('#exportBtn');

// state
let lastArticle = null;
let history = JSON.parse(localStorage.getItem('ws_history') || '[]');
let favorites = JSON.parse(localStorage.getItem('ws_favs') || '[]');

// render history & favorites
function renderHistory() {
  historyBox.innerHTML = '';
  history.slice().reverse().forEach(t => {
    const b = document.createElement('div');
    b.className = 'chip';
    b.textContent = t;
    b.onclick = () => loadArticle(t);
    historyBox.appendChild(b);
  });
}
function renderFavs() {
  favoritesBox.innerHTML = '';
  favorites.slice().reverse().forEach(t => {
    const d = document.createElement('div');
    d.className = 'chip';
    d.textContent = t;
    d.onclick = () => loadArticle(t);
    favoritesBox.appendChild(d);
  });
}
renderHistory(); renderFavs();

// keyboard shortcuts
window.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key.toLowerCase() === 'k') { e.preventDefault(); q.focus(); q.select(); }
  if (e.code === 'Space' && document.activeElement !== q) { e.preventDefault(); toggleSpeak(); }
});

// typeahead suggestions
let taTimer = 0;
q.addEventListener('input', () => {
  clearTimeout(taTimer);
  taTimer = setTimeout(() => doSuggest(q.value), 200);
});

async function doSuggest(term) {
  suggestions.innerHTML = '';
  if (!term) return;
  try {
    const url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=8&origin=*' + '&search=' + encodeURIComponent(term);
    const r = await fetch(url).then(res => res.json());
    const list = r[1] || [];
    list.forEach(t => {
      const el = document.createElement('div');
      el.className = 'suggest';
      el.textContent = t;
      el.onclick = () => { q.value = t; loadArticle(t); suggestions.innerHTML = ''; };
      suggestions.appendChild(el);
    });
  } catch (err) { console.error(err); }
}

// search button & enter key
searchBtn.addEventListener('click', () => { if (q.value.trim()) loadArticle(q.value.trim()); });
q.addEventListener('keydown', e => { if (e.key === 'Enter') { if (q.value.trim()) loadArticle(q.value.trim()); } });

// fetch article from MediaWiki API
async function loadArticle(title) {
  try {
    title = title.trim();
    titleEl.textContent = 'Loading...';
    subtitle.textContent = 'Fetching from Wikipedia...';
    contentEl.innerHTML = '';
    thumb.textContent = 'IMG';
    snippetsEl.innerHTML = '';
    keywordsEl.innerHTML = '';
    headingsEl.innerHTML = '';

    if (!history.includes(title)) {
      history.push(title);
      localStorage.setItem('ws_history', JSON.stringify(history));
    }
    renderHistory();

    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts|pageimages|categories&exintro=true&explaintext=true&piprop=original&titles=${encodeURIComponent(title)}`;
    const res = await fetch(apiUrl).then(r => r.json());
    const pages = res.query.pages;
    const page = pages[Object.keys(pages)[0]];

    if (!page || page.missing) throw new Error('Article not found');

    lastArticle = {
      title: page.title,
      extract: page.extract || '',
      url: 'https://en.wikipedia.org/wiki/' + encodeURIComponent(page.title),
      image: page.original?.source || null,
      categories: (page.categories || []).map(c => c.title.replace('Category:', ''))
    };

    titleEl.textContent = lastArticle.title;
    subtitle.textContent = lastArticle.extract.slice(0, 150) + (lastArticle.extract.length > 150 ? '...' : '');
    thumb.innerHTML = lastArticle.image ? `<img src="${lastArticle.image}" style="width:100%;height:100%;object-fit:cover"/>` : 'No image';
    contentEl.innerHTML = `<p>${lastArticle.extract}</p>`;

    // compute keywords & snippets
    const sentences = lastArticle.extract.split(/(?<=[.!?])\s+/).filter(Boolean);
    const kw = topKeywords(lastArticle.extract, 6);
    renderKeywords(kw);
    renderSnippets(sentences.slice(0, 3));
    renderStats(lastArticle.extract);

    $('#openFull').onclick = () => window.open(lastArticle.url, '_blank');

  } catch (err) {
    console.error(err);
    titleEl.textContent = 'Not found';
    subtitle.textContent = 'Could not fetch article.';
    contentEl.innerHTML = '';
    thumb.textContent = 'IMG';
    snippetsEl.innerHTML = '';
    keywordsEl.innerHTML = '';
  }
}

// helpers
function words(text) { return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean); }
const stopwords = new Set("a,about,after,again,against,all,an,and,any,are,as,at,be,because,been,before,being,below,between,both,but,by,could,did,do,does,doing,down,during,each,few,for,from,further,had,has,have,having,he,her,here,hers,herself,him,himself,his,how,i,if,in,into,is,it,its,itself,me,more,most,my,myself,no,nor,not,of,off,on,once,only,or,other,our,ours,ourselves,out,over,own,same,she,should,so,some,such,than,that,the,their,theirs,them,themselves,then,there,these,they,this,those,through,to,too,under,until,up,very,was,we,were,what,when,where,which,while,who,whom,why,with,would,you,your,yours,yourself,yourselves".split(','));

function topKeywords(text, n = 6) {
  const freq = {};
  words(text).forEach(w => {
    if (stopwords.has(w) || w.length < 3) return;
    freq[w] = (freq[w] || 0) + 1;
  });
  return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, n).map(a => ({ word: a[0], count: a[1] }));
}
function renderKeywords(list) {
  keywordsEl.innerHTML = '';
  list.forEach(k => {
    const el = document.createElement('div');
    el.className = 'tag';
    el.textContent = k.word;
    el.onclick = () => { q.value = k.word; loadArticle(k.word); };
    keywordsEl.appendChild(el);
  });
}
function renderSnippets(list) {
  snippetsEl.innerHTML = '';
  list.forEach(t => {
    const p = document.createElement('div');
    p.className = 'sub';
    p.style.margin = '8px 0';
    p.textContent = t;
    snippetsEl.appendChild(p);
  });
}
function renderStats(text) {
  const wCount = words(text).length;
  readTimeEl.textContent = Math.max(1, Math.round(wCount / 250)) + ' min';
  readScoreEl.textContent = (100 - (wCount / 50)).toFixed(1);
}

// save to favorites
saveBtn.addEventListener('click', () => {
  if (!lastArticle) return;
  if (!favorites.includes(lastArticle.title)) {
    favorites.push(lastArticle.title);
    localStorage.setItem('ws_favs', JSON.stringify(favorites));
    renderFavs();
    alert('Saved to favorites');
  } else { alert('Already in favorites'); }
});

// read aloud
let speaking = false;
readBtn.addEventListener('click', toggleSpeak);
function toggleSpeak() {
  if (!lastArticle) return;
  if (!speaking) {
    const utter = new SpeechSynthesisUtterance(lastArticle.extract);
    speechSynthesis.speak(utter);
    speaking = true;
    utter.onend = () => speaking = false;
  } else {
    speechSynthesis.cancel();
    speaking = false;
  }
}

// export MD
exportBtn.addEventListener('click', () => {
  if (!lastArticle) return;
  const blob = new Blob([`# ${lastArticle.title}\n\n${lastArticle.extract}`], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = lastArticle.title + '.md';
  a.click();
});

// compare
$('#compareBtn').addEventListener('click', () => {
  if (!lastArticle) return alert('Load an article first');
  const other = prompt('Enter another article to compare with:');
  if (!other) return;
  window.open(lastArticle.url, '_blank');
  window.open('https://en.wikipedia.org/wiki/' + encodeURIComponent(other), '_blank');
});

// reader mode
$('#readerMode').addEventListener('click', () => {
  if (!lastArticle) return;
  contentEl.classList.toggle('reader');
  if (contentEl.classList.contains('reader')) {
    contentEl.style.fontSize = '18px';
    contentEl.style.lineHeight = '1.8';
    contentEl.style.background = '#0b1220';
    contentEl.style.padding = '12px';
  } else {
    contentEl.style = '';
  }
});

// share
$('#shareBtn').addEventListener('click', () => {
  if (!lastArticle) return;
  navigator.clipboard.writeText(lastArticle.url)
    .then(() => alert('Link copied: ' + lastArticle.url));
});

// secondary export
$('#mdExport').addEventListener('click', () => {
  if (!lastArticle) return;
  const blob = new Blob([`# ${lastArticle.title}\n\n${lastArticle.extract}`], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = lastArticle.title + '.md';
  a.click();
});

// Dark/light mode toggle
const darkToggle = $('#darkToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if(document.body.classList.contains('dark')){
    document.documentElement.style.setProperty('--bg','#0f1724');
    document.documentElement.style.setProperty('--card','#0b1220');
    document.documentElement.style.setProperty('--muted','#9aa7b2');
    document.documentElement.style.setProperty('--accent','#6ee7b7');
    darkToggle.textContent = '☀️'; // sun icon for light mode
  } else {
    document.documentElement.style.setProperty('--bg','#f5f5f5');
    document.documentElement.style.setProperty('--card','#ffffff');
    document.documentElement.style.setProperty('--muted','#555555');
    document.documentElement.style.setProperty('--accent','#0ea5a9');
    darkToggle.textContent = '🌙'; // moon icon for dark mode
  }
});

