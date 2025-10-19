// Creating Function Clock()

function clock() {
  // Var date assignes as function Date()
  let date = new Date();

  // Assigning values to hh. mm. ss.
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  //if hours is 0 the hours will reset
  if (hh == 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh -= 12;
    session = "PM";
  }
  // If hh. mm. or ss. is less than 10 it will add 0 before the number

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  // The output
  let time = hh + ":" + mm + ":" + ss + " " + session;

  document.getElementById("clock").innerHTML = time;
  let t = setTimeout(function () {
    clock();
  }, 1000);
}
clock();
