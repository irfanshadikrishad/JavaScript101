// Scroll Meter
window.onscroll = () => {
  let pos = document.documentElement.scrollTop;
  let calc_height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scroll = (pos * 100) / calc_height;

  document.getElementById("scroll-in").style.height = scroll + "%";
};

// Scroll to top
function scrollToTop() {
  window.scrollTo(0, 0);
}

// Highlight Color
const colors = ["#84a59d", "#e76f51", "#0077b6", "#bdd5ea", "#8ac926"];

window.addEventListener("mousedown", (e) => {
  const color = colors.shift();
  document.documentElement.style.setProperty("--highlight-color", color);
  colors.push(color);
});
