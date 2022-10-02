//timer countdown start
const stringMinite = prompt("Minute's to count?");
let time = stringMinite * 60;

setInterval(updatecount, 1000);

function updatecount(){
    let minites = Math.floor(time/60);
    let seconds = time % 60;
    if(seconds<10){
        seconds = '0'+seconds;
    }else{
        seconds = seconds;
    }
    if(minites<10){
        minites = '0' + minites;
    }else{
        minites = minites;
    }
    if(seconds<'00' && minites<'00'){
        document.getElementById('countdown').innerHTML = 'Countdown Completed!';
        return
    }
    document.getElementById('countdown').innerHTML = `${minites}:${seconds}`;
    time--;
}
//time countdown end