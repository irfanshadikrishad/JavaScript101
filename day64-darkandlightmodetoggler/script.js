function dark() {
    var element = document.body;
    element.classList.toggle("light-mode");
}

const img = document.getElementById('sun');
let toggle = true;
img.addEventListener('click', function(){
    toggle = !toggle;
    if(toggle){
        img.src= 'img/sun.png';
    }
    else{
        img.src= 'img/moon.png'
    }
})