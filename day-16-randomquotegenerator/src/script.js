function quote() {
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("quote").innerHTML = data["content"];
      document.getElementById("author").innerHTML = "— " + data["author"];
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
