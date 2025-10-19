let APIKEY = "641ec2c5b392030a75d78901c8b1292e";
fetch(`http://api.ipstack.com/check?access_key=${APIKEY}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    document.getElementById("ipadress").innerHTML = data["ip"];
    document.getElementById("location").innerHTML =
      "<b>Location: </b>" +
      data["city"] +
      "-" +
      data["zip"] +
      ", " +
      data["country_name"];
    document.getElementById("continent").innerHTML =
      "<b>Continent: </b>" + data["continent_name"];
    document.getElementById("lati").innerHTML =
      "<b>Latitude: </b>" + data["latitude"];
    document.getElementById("long").innerHTML =
      "<b>Longitude: </b>" + data["longitude"];
    document.getElementById("flag").src = data["location"]["country_flag"];
    document.getElementById("language").innerHTML =
      "<b>Language: </b>" +
      data["location"]["languages"][0]["name"] +
      "(" +
      data["location"]["languages"][0]["native"] +
      ")";
  });
