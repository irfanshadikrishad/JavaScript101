setInterval(count, 1000);
var char = document.getElementById('myinput');
function count(){
    document.getElementById('counter').innerHTML = char.value.length + "!";
}