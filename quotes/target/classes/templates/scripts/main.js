var counter = document.getElementById('counter').getContext('2d');
$("#counter").hide();
$("#stop").hide();
var startNumber = 0;
var pointToFill = 4.7;
var interval;
var saveBuf;

/*
* Progress-bar
*/
function Counter() {
    var diff = ((startNumber / 100) * Math.PI * 2 * 10);
    counter.clearRect(0, 0, counter.canvas.width, counter.canvas.height);   // Clear canvas every time when function is call
    counter.lineWidth = 15;
    counter.fillStyle = '#fff';
    counter.strokeStyle = '#F5E0A9';
    counter.textAlign = 'center';
    counter.font = "25px monospace";    //set font size and face
    counter.fillText(startNumber + '%', 100, 110);       //fillText(text,x,y);
    counter.beginPath();
    counter.arc(100, 100, 90, pointToFill, diff / 10 + pointToFill);    //arc(x,y,radius,start,stop)
    counter.stroke();   // to fill stroke

    if (startNumber >= 100) {
        clearTimeout(interval);
        findQuotesText();
    }
    startNumber++;
}

/*
* AJAX
*/
function getForm(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.withCredentials = false;
    xhr.send();
    return xhr.responseText;
}

/*
* After 100%
*/
function findQuotesText() {
    $("#counter").hide();
    $("#stop").hide();
    $("#play").show();
    saveBuf = getForm('http://localhost:8080/text');
    //saveBuf = getForm('http://192.168.0.2:8080/text');  // Testing on other devices
    document.getElementById('quotesText').innerHTML = saveBuf;
}


document.getElementById('play').onclick = function () {
    saveBuf = document.getElementById('quotesText').innerHTML;
    document.getElementById('quotesText').innerHTML = '';
    startNumber = 0;
    $("#counter").show();
    $("#play").hide();
    $("#stop").show();
    /*
    * Call Counter - after every 50MS
    */
    interval = setInterval(Counter, 50);
};

document.getElementById('stop').onclick = function () {
    $("#counter").hide();
    $("#stop").hide();
    $("#play").show();
    clearTimeout(interval);
    document.getElementById('quotesText').innerHTML = saveBuf;
};
