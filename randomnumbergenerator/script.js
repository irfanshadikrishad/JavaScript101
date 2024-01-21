function generate(){
    var minimum = document.getElementById('min').value;
    var maximum = document.getElementById('max').value;

    let x = Math.floor(Math.random() * (Number(maximum)-Number(minimum))) + Number(minimum);
    document.getElementById('g').innerHTML = x;
}