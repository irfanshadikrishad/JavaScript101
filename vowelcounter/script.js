setInterval(vowel, 1000);
function vowel(){
    document.getElementById('counter').innerHTML = 'Total Vowel: '+ document.getElementById('text').value.toLowerCase().match(/[aeiou]/gi).length;
}