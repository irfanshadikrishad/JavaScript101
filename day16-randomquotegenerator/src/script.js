// Fetching Quote
function quote() {
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById('copy').innerHTML = 'Copy <i class="fa-regular fa-copy"></i>';
      document.getElementById("quote").innerHTML = data["content"];
      document.getElementById("author").innerHTML = "— " + data["author"];
      document.getElementById('tag').innerHTML = data['tags'][0]
    });
}

document.getElementById("next").addEventListener("click", quote);

// COPY
function copy() {
  navigator.clipboard.writeText(
    document.getElementById("quote").innerHTML +
      document.getElementById("author").innerHTML
  );

  document.getElementById("copy").innerHTML =
    'Copied <i class="fa-regular fa-circle-check"></i>';
}
