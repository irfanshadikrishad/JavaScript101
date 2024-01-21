const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [type="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
const text = document.querySelector("#hello");

msg.text = document.querySelector('[name="text"]').value;

function textarea(e) {
  msg.text = document.querySelector('[name="text"]').value;
}

text.addEventListener("onchange", textarea);

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices.map(
    (voice) =>
      `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
  );
}
function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
  toggle();
}
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}
function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}
speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
options.forEach((option) => option.addEventListener("change", setOption));
speakButton.addEventListener("click", toggle);
stopButton.addEventListener("click", () => toggle(false));
