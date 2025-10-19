const metr = document.getElementById("unit");
metr.addEventListener("click", () => {
  const indo = metr.selectedIndex;
  if (indo == 1) {
    document.getElementById("feet").placeholder = "cm";
  } else if (indo == 0) {
    document.getElementById("feet").placeholder = "kg";
  }
});
//
function calculate() {
  const index = document.getElementById("unit").selectedIndex;
  if (index == 0) {
    const wei = document.getElementById("weight").value;
    const hei = document.getElementById("feet").value;
    const result = `${wei / (hei / 3.281) ** 2}`;
    const fres = Math.round(result).toFixed(1);
    document.getElementById("bmires").innerHTML = fres;
    if (fres < 18 || fres > 30) {
      document.getElementsByClassName("bmi")[0].style.backgroundColor =
        "rgba(206, 6, 6, 0.87)";
    } else if (fres > 18.5 && fres < 25) {
      document.getElementsByClassName("bmi")[0].style.backgroundColor = "green";
    } else if (fres > 25 && fres < 30) {
      document.getElementsByClassName("bmi")[0].style.backgroundColor =
        "tomato";
    }
  } else if (index == 1) {
    const wei = document.getElementById("weight").value;
    const hei = document.getElementById("feet").value;
    const re = `${(wei / hei / hei) * 10000}`;
    const fres = Math.round(re).toFixed(1);
    document.getElementById("bmires").innerHTML = fres;
    if (fres < 18 || fres > 30) {
      document.getElementsByClassName("bmi")[0].style.backgroundColor =
        "rgba(206, 6, 6, 0.87)";
    } else if (fres > 18.5 && fres < 25) {
      document.getElementsByClassName("bmi")[0].style.backgroundColor = "green";
    } else if (fres > 25 && fres < 30) {
      document.getElementsByClassName("bmi")[0].style.backgroundColor =
        "tomato";
    }
  }
}
