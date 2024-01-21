//Drive Link Generator
function drivegenerate(){
    let confirmGLink = document.getElementById('drive').value.includes("https://drive.google.com/file/d/");
    if(confirmGLink == true){
        let refinedLink = document.getElementById('drive').value.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=download&id=").replace("/view?usp=sharing", "");
        document.getElementById('copy-input').value = refinedLink;
    } else{
        alert('Required Google Drive Share Link!');
    }
}
function audiogenerate(){
    let confirmALink = document.getElementById('audio').value.includes("https://drive.google.com/file/d/");
    if(confirmALink == true){
        const audio1 = '<audio width="300" height="32" controls="controls" src="';
        const audio2 = '" type="audio/mp3"></audio>';
        let refinedALink = document.getElementById('audio').value.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=download&id=").replace("/view?usp=sharing", "");
        document.getElementById('copy-input-audio').value = `${audio1}${refinedALink}${audio2}`;
    }else{
        alert('Required Google Drive Share Link!');
    }
}
function videogenerate(){
    let confirmVLink = document.getElementById('video').value.includes("https://drive.google.com/file/d/");
    if(confirmVLink == true){
        const video1 = '<iframe src="';
        const video2 = '/preview" width="560" height="315"></iframe>';
        let refinedVLink = document.getElementById('video').value.replace("/view?usp=sharing", "");
        document.getElementById('copy-input-video').value = `${video1}${refinedVLink}${video2}`;
    }else{
        alert('Required Google Drive Share Link!');
    }
}
//Copy Section Drive
function clickin(){
    var copyText = document.getElementById("copy-input");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    
    document.getElementById('copy').innerHTML = '<i class="fa-regular fa-copy"></i> Copied!';
    document.getElementById('copy').style.backgroundColor = 'green';
    document.getElementById('copy').style.color = 'lavender';
}
function clickinAudio(){
    var copyText = document.getElementById("copy-input-audio");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    
    document.getElementById('copy-audio').innerHTML = '<i class="fa-regular fa-copy"></i> Copied!';
    document.getElementById('copy-audio').style.backgroundColor = 'green';
    document.getElementById('copy-audio').style.color = 'lavender';
}
function clickinVideo(){
    var copyText = document.getElementById("copy-input-video");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    
    document.getElementById('copy-video').innerHTML = '<i class="fa-regular fa-copy"></i> Copied!';
    document.getElementById('copy-video').style.backgroundColor = 'green';
    document.getElementById('copy-video').style.color = 'lavender';
}

//Change Buttons - Three Btns
function poplink(){
    document.getElementById('lowerpart').style.display = 'block';
    document.getElementById('lowerpart-audio').style.display = 'none';
    document.getElementById('lowerpart-video').style.display = 'none';

    document.getElementById('btn1').style.backgroundColor = 'tomato';
    document.getElementById('btn2').style.backgroundColor = '#F0F0F0';
    document.getElementById('btn3').style.backgroundColor = '#F0F0F0';

    document.getElementById('btn1').style.color = 'lavender';
    document.getElementById('btn2').style.color = 'black';
    document.getElementById('btn3').style.color = 'black';
}
function popaudio(){
    document.getElementById('lowerpart').style.display = 'none';
    document.getElementById('lowerpart-audio').style.display = 'block';
    document.getElementById('lowerpart-video').style.display = 'none';

    document.getElementById('btn1').style.backgroundColor = '#F0F0F0';
    document.getElementById('btn2').style.backgroundColor = 'tomato';
    document.getElementById('btn3').style.backgroundColor = '#F0F0F0';

    document.getElementById('btn1').style.color = 'black';
    document.getElementById('btn2').style.color = 'lavender';
    document.getElementById('btn3').style.color = 'black';
}
function popvideo(){
    document.getElementById('lowerpart').style.display = 'none';
    document.getElementById('lowerpart-audio').style.display = 'none';
    document.getElementById('lowerpart-video').style.display = 'block';

    document.getElementById('btn1').style.backgroundColor = '#F0F0F0';
    document.getElementById('btn2').style.backgroundColor = '#F0F0F0';
    document.getElementById('btn3').style.backgroundColor = 'tomato';

    document.getElementById('btn1').style.color = 'black';
    document.getElementById('btn2').style.color = 'black';
    document.getElementById('btn3').style.color = 'lavender';
}
