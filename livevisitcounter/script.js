const countEl = document.getElementById('count');

visit();
function visit(){
    fetch('https://api.countapi.xyz/update/proffesorghost/ghost/?amount=1').then(res => res.json()).then(res => {
        countEl.innerHTML = res.value;
    });
}