// last modified 06 October 2022
// irfanshadikrishad - irfanshadikofficial
var form = document.getElementById('theform');
form.addEventListener('submit', function(e){
    e.preventDefault()
    document.getElementById('result').style.display = 'flex';
    let username = document.getElementById('searchuser').value;
fetch(`https://api.github.com/users/${username}`).then(res => res.json()).then(
    data => {
        document.getElementById('pfp').src = data['avatar_url'];
        document.getElementById('name').innerHTML = data['name'];
        document.getElementById('username-url').href = data['html_url'];
        document.getElementById('username').innerHTML = '@'+data['login'];
        document.getElementById('bio').innerHTML = data['bio'];
        document.getElementById('follower').innerHTML = data['followers'];
        document.getElementById('following').innerHTML = data['following'];
        document.getElementById('repo').innerHTML = data['public_repos'];
        document.getElementById('location').innerHTML = data['location'];
        document.getElementById('website').innerHTML = data['blog'];
        document.getElementById('twitter').innerHTML = '@'+data['twitter_username'];
        document.getElementById('organization').innerHTML = data['company'];
        document.getElementById('joindate').innerHTML = data['created_at'].slice(0, 10);
        document.getElementById('website-url').href = 'https://'+data['blog'];
        document.getElementById('twitter-url').href = 'https://twitter.com/'+data['twitter_username'];
})
})

//darkmode-lightmode
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