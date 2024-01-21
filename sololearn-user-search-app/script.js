const form = document.getElementById('form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById('result').style.display = 'flex';
    let uid = document.getElementById('input').value;
    fetch(`https://api.sololearn.repl.co/profile/${uid}`).then(res => res.json()).then(
        data => {
            console.log(data.userDetails);
            document.getElementById('pfp').src = data.userDetails.avatarUrl;
            document.getElementById('name').innerHTML = data.userDetails.name;
            document.getElementById('bio').innerHTML = data.userDetails.bio;
            document.getElementById('follower').innerHTML = data.userDetails.followers;
            document.getElementById('following').innerHTML = data.userDetails.following;
            document.getElementById('level').innerHTML = data.userDetails.level;
            document.getElementById('xp').innerHTML = data.userDetails.xp;
            document.getElementById('badge').innerHTML = data.userDetails.badges[0].name;
            let ac = data.userDetails.isPro;
            if(ac==false){
                document.getElementById('ac').innerHTML = 'Basic';
            }else{
                document.getElementById('ac').innerHTML = 'Pro';
            }
            document.getElementById('createddate').innerHTML = (data.userDetails.registerDate).slice(0, 10);

            //
            if(document.getElementById('badge').innerHTML=='gold'){
                document.getElementById('badge').style.color = '#FFD700';
            }else if(document.getElementById('badge').innerHTML=='silver'){
                document.getElementById('badge').style.color = '#C0C0C0';
            }else if(document.getElementById('badge').innerHTML=='bronze'){
                document.getElementById('badge').style.color = '#CD7F32';
            }else if(document.getElementById('badge').innerHTML=='platinum'){
                document.getElementById('badge').style.color = '#01579b';
            }
            //socialll - github
            if(data.userDetails.connectedAccounts[0].service=='GitHub'){
                document.getElementById('github').style.display = 'inline';
                document.getElementById('glink').href = data.userDetails.connectedAccounts[0].profileUrl;
            }else if(data.userDetails.connectedAccounts[1].service=='GitHub'){
                document.getElementById('github').style.display = 'inline';
                document.getElementById('glink').href = data.userDetails.connectedAccounts[1].profileUrl;
            }else if(data.userDetails.connectedAccounts[2].service=='GitHub'){
                document.getElementById('github').style.display = 'inline';
                document.getElementById('glink').href = data.userDetails.connectedAccounts[2].profileUrl;
            }
            //socialll - linkedin
            if(data.userDetails.connectedAccounts[0].service=='LinkedIn'){
                document.getElementById('linkedin').style.display = 'inline';
                document.getElementById('llink').href = data.userDetails.connectedAccounts[0].profileUrl;
            }else if(data.userDetails.connectedAccounts[1].service=='LinkedIn'){
                document.getElementById('linkedin').style.display = 'inline';
                document.getElementById('llink').href = data.userDetails.connectedAccounts[1].profileUrl;
            }else if(data.userDetails.connectedAccounts[2].service=='LinkedIn'){
                document.getElementById('linkedin').style.display = 'inline';
                document.getElementById('llink').href = data.userDetails.connectedAccounts[2].profileUrl;
            }
            //socialll - StackOverflow
            if(data.userDetails.connectedAccounts[0].service=='StackOverflow'){
                document.getElementById('stackoverflow').style.display = 'inline';
                document.getElementById('slink').href = data.userDetails.connectedAccounts[0].profileUrl;
            }else if(data.userDetails.connectedAccounts[1].service=='StackOverflow'){
                document.getElementById('stackoverflow').style.display = 'inline';
                document.getElementById('slink').href = data.userDetails.connectedAccounts[1].profileUrl;
            }else if(data.userDetails.connectedAccounts[2].service=='StackOverflow'){
                document.getElementById('stackoverflow').style.display = 'inline';
                document.getElementById('slink').href = data.userDetails.connectedAccounts[2].profileUrl;
            }
        }
    )
})