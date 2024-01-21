function qrcodegen(){
    const val = document.getElementById('inp');
    const qr = document.getElementById('qr-img');
    qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${val.value}`;
    document.getElementById('qr-show').style.display = 'inline-block';
}

//barcode
function barcodegen(){
    const barvalue = document.getElementById('bar');
    JsBarcode("#barcode", barvalue.value)
    document.getElementById('barcode').style.display = 'inline-block';
}