setInterval(status, 1000);

function status(){
    var sts = window.navigator.onLine;
    if(sts){
        document.getElementById('status').innerHTML = "online";
        document.getElementById('status').style.color = "green";
        document.getElementById('statusicon').src = "img/worldwide.png";
        document.getElementById('offlinemsg').style.display = "none";

    } else{
        document.getElementById('statusicon').src = "img/network.png";
        document.getElementById('status').innerHTML = "offline";
        document.getElementById('status').style.color = "red";
        document.getElementById('offlinemsg').innerHTML = "Please check your internet connection and try again";
}
}