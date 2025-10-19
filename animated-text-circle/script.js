const text = document.querySelector(".text p");
text.innerHTML = text.innerHTML
  .split("")
  .map(
    (char, i) =>
      `<span style="transform: rotate(${i * 7.4}deg)">${char}</span>`,
  )
  .join("");
