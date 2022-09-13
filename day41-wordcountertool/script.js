setInterval(count, 1000)
function count(){
    document.getElementById('counter').innerHTML = 
    "Word Count: " + document.getElementById('text').value.split(" ").length + " | " 
    + "Char Count: " + document.getElementById('text').value.length;
}