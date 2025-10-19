function eclickin() {
  var copyText = document.getElementById("encodedtext");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
}
function dclickin() {
  var copyText = document.getElementById("decodedtext");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
}

//encode-decode
function encode() {
  let etext = document.getElementById("encodetext").value;
  const encodedText = btoa(etext);
  document.getElementById("encodedtext").value = encodedText;
}
function decode() {
  let dtext = document.getElementById("decodetext").value;
  const decodedText = atob(dtext);
  document.getElementById("decodedtext").value = decodedText;
}
