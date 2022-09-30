function check(){
    let text = document.getElementById('textarea').value;
    let rtext = document.getElementById('textarea').value.split("").reverse().join("");
    if(text == rtext){
        document.getElementById('checked').innerHTML = 'This is a Palindrom!';
        document.getElementById('checked').style.color = 'green';
    }else{
        document.getElementById('checked').innerHTML = 'This is not a Palindrom!';
        document.getElementById('checked').style.color = 'red';
    }
}