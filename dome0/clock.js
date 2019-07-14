var canvasDom = document.querySelector("#clock");
var ctx = canvasDom.getContext('2d');
var w = canvasDom.width;
var h = canvasDom.height;
var r = w / 2;
var scale = w/200;

// 画时钟外圆
function drawBgCircle() {
    ctx.save();
    ctx.translate(r, r);
    ctx.beginPath();
    ctx.lineWidth = 10*scale;
    ctx.arc(0,0,r-5*scale,0,2*Math.PI,false);
    ctx.stroke();
}

// 画小时
function drawHours() {
    var hours = [3,4,5,6,7,8,9,10,11,12,1,2];
    ctx.font =18*scale+"px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    hours.forEach(function(item, index){
        let anger = Math.PI*2/12*index;
        let y = Math.sin(anger)*(r-30*scale);
        let x = Math.cos(anger)*(r-30*scale);
        ctx.fillText(item,x,y);
    });
}

// 画圆点
function drawPoint() {
    for (var i=0; i<60; i++) {
        var anger = Math.PI * 2 / 60 * i;
        let y = Math.sin(anger)*(r-18*scale);
        let x = Math.cos(anger)*(r-18*scale);
        ctx.beginPath();
        if (i % 5 === 0) {
            ctx.fillStyle = "#000";
        } else {
            ctx.fillStyle = "#ccc";
        }
        ctx.arc(x,y,2,0,2*Math.PI, false);
        ctx.fill();
    }
}

// 画时针
function hourShot(h,m) {
    ctx.save();
    ctx.beginPath();
    ctx.rotate(Math.PI / 6 * h+Math.PI / 6 / 60 * m);
    ctx.lineWidth = 6*scale;
    ctx.strokeStyle = "blue";
    ctx.lineCap = "round";
    ctx.moveTo(0,10*scale);
    ctx.lineTo(0,-r/2);
    ctx.stroke();
    ctx.restore();
}

// 画分针
function minutesShot(m,s) {
    ctx.save();
    ctx.beginPath();
    ctx.rotate(Math.PI / 30 * m);
    ctx.lineWidth = 4*scale;
    ctx.strokeStyle = "green";
    ctx.lineCap = "round";
    ctx.moveTo(0,10*scale);
    ctx.lineTo(0,-r/2-10*scale);
    ctx.stroke();
    ctx.restore();
}

// 画秒针
function secondsShot(s) {
    ctx.save();
    ctx.beginPath();
    ctx.rotate(Math.PI / 30 * s);
    ctx.lineWidth = 2*scale;
    ctx.strokeStyle="#f00";
    ctx.lineCap = "round";
    ctx.moveTo(0,10*scale);
    ctx.lineTo(0,-r/2-15*scale);
    ctx.stroke();
    ctx.restore();
}

// 画固定点
function fixedPoint() {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(0,0,3*scale,0,Math.PI * 2,);
    ctx.fill();
}

// 画时钟总函数
function drawTime() {
    var nowDate = new Date();
    var hour = nowDate.getHours();
    var minutes = nowDate.getMinutes();
    var seconds = nowDate.getSeconds();
    ctx.clearRect(0,0,w,h);
    drawBgCircle();
    drawHours();
    drawPoint();
    hourShot(hour,minutes);
    minutesShot(minutes);
    secondsShot(seconds);
    fixedPoint();
    ctx.restore();
}

drawTime();

setInterval(drawTime, 1000);