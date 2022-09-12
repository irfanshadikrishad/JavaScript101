const setBg = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
    co.innerHTML = "#" + randomColor;
}
  
genNew.addEventListener("click", setBg);
setBg();