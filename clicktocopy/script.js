function clickin(){
    var copyText = document.getElementById("myinput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    
    var tooltip = document.getElementById("mytooltip");
    var text = copyText.value;
    if(text.length > 22){
        text = text.slice(0, 15) + "...";
    }
    tooltip.innerHTML = "Copied: " + text;
  }
  
function clickout(){
    var tooltip = document.getElementById("mytooltip");
    tooltip.innerHTML = "Copy to clipboard";
}