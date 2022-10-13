const foo = document.getElementById('form');
foo.addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById('result').style.display = 'inline-block';

    const loc = document.getElementById('loc').value;
    fetch(`http://api.weatherstack.com/current?access_key=4486a4a58ffc95df33f858355800c608&query=${loc}`).then(res => res.json()).then(data => {
        document.getElementById('location').innerHTML = data['location']['name'] + ', ' + data['location']['country'];
        document.getElementById('desc').innerHTML = data['current']['weather_descriptions'];
        document.getElementById('icon').src = data['current']['weather_icons'][0];
        document.getElementById('temp').innerHTML = data['current']['temperature']+'°';
        document.getElementById('speed').innerHTML = data['current']['wind_speed']+'mph'
            +', '+ data['current']['wind_dir'] +', '+ data['current']['wind_degree']+'°';
        document.getElementById('pressure').innerHTML = data['current']['pressure'];
        document.getElementById('humidity').innerHTML = data.current.humidity;
    })
})