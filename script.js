//获取 id 元素
var $ = function (id) {
    return document.getElementById(id);
}

//g：重力加速度，v_x：x轴方向的速度，v_y：y轴方向的速度
var ball = { x: 512, y: 100, r: 20, g: 4, v_x: -4, v_y: 0, color: "#058" };

var render = function (cont) {
    cont.clearRect(0, 0, cont.canvas.width, cont.canvas.height);
    cont.fillStyle = ball.color;
    cont.beginPath();
    cont.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
    cont.closePath();
    cont.fill();
}

var update = function () {
    ball.x += ball.v_x;
    ball.y += ball.v_y;
    ball.v_y += ball.g;

    //对底部碰撞检测
    if (ball.y >= 768 - ball.r) {
        ball.y = 768 - ball.r;
        ball.v_y = -ball.v_y / 2;
    }
}

window.onload = function () {
    var canvas = $("canvas"),
        context = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 768;
    canvas.style.border = "1px solid #aaa";

    setInterval(function () {
        render(context);
        update();
    }, 50);
}