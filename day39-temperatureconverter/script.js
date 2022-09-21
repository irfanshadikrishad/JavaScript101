function celcious(c){
    document.getElementById('farenheit').value = ((Number(c)*1.8)+32).toFixed(2); //(c*1.8)+32
    document.getElementById('kelvin').value = (Number(c)+273.15).toFixed(2); //℃+273.15
}
function farenheit(f){
    document.getElementById('celcious').value = ((Number(f)-32)/1.8).toFixed(2); //(℉-32)/1.8
    document.getElementById('kelvin').value = (((Number(f)-32)/1.8)+273.15).toFixed(2); //((℉-32)/1.8)+273.15
}
function kelvin(k){
    document.getElementById('celcious').value = (Number(k)-273.15).toFixed(2); //K-273.15
    document.getElementById('farenheit').value = (((Number(k)-273.15)*1.8)+32).toFixed(2); //((K-273.15)*1.8)+32
    
}