const keys = document.querySelectorAll('.piano-keys');
const downloadBtn = document.getElementById('download');
let learningMode = false;

let recording = false;
let recordedNotes = [];
let recordStart = 0;
let renderedBlob = null;

const soundMap = {
  "01": "a.wav","02": "d.wav","03": "e.wav","04": "f.wav",
  "05": "g.wav","06": "h.wav","07": "j.wav","08": "k.wav",
  "09": "l.wav","10": "o.wav","11": "p.wav","12": "s.wav",
  "13": "t.wav","14": "u.wav","15": "w.wav","16": "y.wav",
  "17": ";.wav"
};

function playSound(keyElement) {
  const soundId = keyElement.dataset.key;
  if (!soundMap[soundId]) return;

  const audio = new Audio(`./KeySounds/${soundMap[soundId]}`);
  audio.play();

  keyElement.classList.add("active");
  setTimeout(() => keyElement.classList.remove("active"), 200);

  if (recording) {
    const time = Date.now() - recordStart;
    recordedNotes.push({ key: soundId, time: time });
  }
}

keys.forEach(key => key.addEventListener('click', () => playSound(key)));

// learning toggle
document.getElementById('toggle-learning')?.addEventListener('click', () => {
  learningMode = !learningMode;
  document.querySelector('.piano-keys-list').classList.toggle('learning-mode', learningMode);
  const lr = document.getElementById('learning-resources');
  if (lr) lr.style.display = learningMode ? 'block' : 'none';
});

// start record
document.getElementById('start-record').addEventListener('click', () => {
  recordedNotes = [];
  recording = true;
  recordStart = Date.now();
  renderedBlob = null;

  document.getElementById('start-record').disabled = true;
  document.getElementById('stop-record').disabled = false;
  document.getElementById('play-recording').disabled = true;
  downloadBtn.style.display = "none";
  alert("Recording started...");
});

// stop record (render offline)
document.getElementById('stop-record').addEventListener('click', async () => {
  recording = false;
  document.getElementById('start-record').disabled = false;
  document.getElementById('stop-record').disabled = true;

  if (recordedNotes.length === 0) {
    alert("Nothing recorded");
    return;
  }

  try {
    // find length in seconds
    const lastTime = Math.max(...recordedNotes.map(n => n.time));
    const duration = (lastTime + 2000) / 1000; // seconds

    const offlineCtx = new OfflineAudioContext(2, 44100 * duration, 44100);

    // schedule each note
    for (let note of recordedNotes) {
      const file = soundMap[note.key];
      if (!file) continue;
      const resp = await fetch(`./KeySounds/${file}`);
      if (!resp.ok) {
        console.error('Missing file', file);
        continue;
      }
      const arrayBuf = await resp.arrayBuffer();
      const audioBuf = await offlineCtx.decodeAudioData(arrayBuf);
      const src = offlineCtx.createBufferSource();
      src.buffer = audioBuf;
      src.connect(offlineCtx.destination);
      src.start(note.time / 1000);
    }

    const renderedBuffer = await offlineCtx.startRendering();
    renderedBlob = bufferToWave(renderedBuffer, renderedBuffer.length);

    // enable play & download
    const url = URL.createObjectURL(renderedBlob);
    document.getElementById('play-recording').disabled = false;
    downloadBtn.href = url;
    downloadBtn.download = 'piano_recording.wav';
    downloadBtn.style.display = 'inline-block';
    alert("Recording stopped. You can now play or download it.");
  } catch (err) {
    console.error(err);
    alert("Error while rendering recording. Check console.");
  }
});

// play recorded audio from blob
document.getElementById('play-recording').addEventListener('click', () => {
  if (!renderedBlob) return alert("No recording available");

  // play the rendered audio
  const audio = new Audio(URL.createObjectURL(renderedBlob));
  audio.play();

  // flash keys at recorded times
  recordedNotes.forEach(note => {
    setTimeout(() => {
      const keyElement = document.querySelector(`.piano-keys[data-key="${note.key}"]`);
      if (keyElement) {
        keyElement.classList.add('active');
        setTimeout(() => keyElement.classList.remove('active'), 200);
      }
    }, note.time);
  });
});

// helper: convert AudioBuffer to WAV Blob
function bufferToWave(abuffer, len) {
  const numOfChan = abuffer.numberOfChannels,
        length = len * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [],
        sampleRate = abuffer.sampleRate;

  let offset = 0;
  function setUint16(data) { view.setUint16(offset, data, true); offset += 2; }
  function setUint32(data) { view.setUint32(offset, data, true); offset += 4; }

  // RIFF chunk descriptor
  setUint32(0x46464952); // "RIFF"
  setUint32(length - 8); // file length - 8
  setUint32(0x45564157); // "WAVE"

  // FMT sub-chunk
  setUint32(0x20746d66); // "fmt "
  setUint32(16); // size
  setUint16(1); // PCM
  setUint16(numOfChan);
  setUint32(sampleRate);
  setUint32(sampleRate * numOfChan * 2);
  setUint16(numOfChan * 2);
  setUint16(16);

  // data sub-chunk
  setUint32(0x61746164); // "data"
  setUint32(length - offset - 4);

  for (let i = 0; i < numOfChan; i++)
    channels.push(abuffer.getChannelData(i));

  let interleaved = new Float32Array(len * numOfChan);
  for (let i = 0; i < len; i++) {
    for (let channel = 0; channel < numOfChan; channel++) {
      interleaved[i * numOfChan + channel] = channels[channel][i];
    }
  }

  let index = 44;
  const volume = 1;
  for (let i = 0; i < interleaved.length; i++, index += 2) {
    let sample = Math.max(-1, Math.min(1, interleaved[i] * volume));
    view.setInt16(index, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
  }

  return new Blob([buffer], { type: "audio/wav" });
}
