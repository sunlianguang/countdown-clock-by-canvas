var WINDOW_WIDTH = 1024,
    WINDOW_HEIGHT = 768,
    RADIUS = 8,
    MARGIN_TOP = 60,
    MARGIN_LEFT = 30;

//���õ���ʱĿ��ʱ��
var countdown = 10,  //����ʱ������
    endTime = new Date();
endTime.setTime(endTime.getTime() + countdown * 1000);

var curShowTimeSeconds = 0,
    timeBall = [],
    balls = [],
    colors = ["#33b5e5", "#09c", "#a6c", "#93c", "#9c0", "#690", "#fb3", "#f80", "#f44", "#c00"];

//��ȡ id Ԫ��
var $ = function (id) {
    return document.getElementById(id);
}

//��������
var renderDigit = function (x, y, num, cont) {
    cont.fillStyle = "rgb(0, 102, 153)";

    for (var i = 0; i < digit[num].length; ++i) {
        for (var j = 0; j < digit[num][i].length; ++j) {
            if (digit[num][i][j] === 1) {
                var x_0 = x + j*2*(RADIUS+1) + (RADIUS+1),
                    y_0 = y + i*2*(RADIUS+1) + (RADIUS+1);
                cont.beginPath();
                cont.arc(x_0, y_0, RADIUS, 0, Math.PI*2);
                cont.closePath();
                cont.fill();
            }
        }
    }
}

//Ϊ�������С��
var addBalls = function (x, y, num) {
    for (var i = 0; i < digit[num].length; ++i) {
        for (var j = 0; j < digit[num][i].length; ++j) {
            if (digit[num][i][j] === 1) {
                var aBall = {
                    x: x + j*2*(RADIUS+1) + (RADIUS+1),
                    y: y + i*2*(RADIUS+1) + (RADIUS+1),
                    g: 1.5 + Math.random(),
                    v_x: Math.pow(-1, Math.ceil(Math.random()*1000)) * 4,//ȡ 4 �� -4
                    v_y: -5,
                    color: colors[Math.floor(Math.random()*colors.length)]
                }
                balls.push(aBall);
            }
        }
    }
}

//����������
var render = function (cont) {
    //�Ծ��οռ��ڵ�ͼ�����ˢ��
    cont.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    //����һ������ʱʱ��
    var hours = parseInt(curShowTimeSeconds / 3600),
        minutes = parseInt(curShowTimeSeconds % 3600 / 60),
        seconds = curShowTimeSeconds % 60;

    //��������
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cont);
    renderDigit(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(hours%10), cont);
    renderDigit(MARGIN_LEFT + 30*(RADIUS+1), MARGIN_TOP, 10, cont);
    renderDigit(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(minutes/10), cont);
    renderDigit(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(minutes%10), cont);
    renderDigit(MARGIN_LEFT + 69*(RADIUS+1), MARGIN_TOP, 10, cont);
    renderDigit(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(seconds/10), cont);
    renderDigit(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(seconds%10), cont);

    //����С��
    for (var i = 0; i < balls.length; ++i) {
        var aBall = balls[i];
        cont.fillStyle = aBall.color;
        cont.beginPath();
        cont.arc(aBall.x, aBall.y, RADIUS, 0, Math.PI*2);
        cont.closePath();
        cont.fill();
    }
}

//�õ���ǰʱ����Ŀ��ʱ����������
var getCurrentShowTimeSeconds = function () {
    var curTime = new Date(),
        //getTime() �õ�������
        ret = endTime.getTime() - curTime.getTime();

    //ת��������
    ret = Math.round(ret / 1000);
    return ret >= 0 ? ret : 0;
}

//�õ���ǰʱ�䣨չʾʱ�ӵ�д����
//var getCurrentShowTimeSeconds = function () {
//    var curTime = new Date(),
//        ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
//
//    return ret;
//}

//���¡������ӡ��͡�С�򡿵ı仯
var update = function () {
    var newShowTimeSeconds = getCurrentShowTimeSeconds(),
        newHours = parseInt(newShowTimeSeconds / 3600),
        newMinutes = parseInt(newShowTimeSeconds % 3600 / 60),
        newSeconds = parseInt(newShowTimeSeconds % 60),
        curHours = parseInt(curShowTimeSeconds / 3600),
        curMinutes = parseInt(curShowTimeSeconds % 3600 / 60),
        curSeconds = parseInt(curShowTimeSeconds % 60);

    if (newShowTimeSeconds !== curShowTimeSeconds) {
        //Ϊ��һ��ĸı������λ����С��
        if (parseInt(newHours/10) !== parseInt(curHours/10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours/10));
        }
        if (parseInt(newHours%10) !== parseInt(curHours%10)) {
            addBalls(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(curHours%10));
        }
        if (parseInt(newMinutes/10) !== parseInt(curMinutes/10)) {
            addBalls(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes/10));
        }
        if (parseInt(newMinutes%10) !== parseInt(curMinutes%10)) {
            addBalls(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes%10));
        }
        if (parseInt(newSeconds/10) !== parseInt(curSeconds/10)) {
            addBalls(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds/10));
        }
        if (parseInt(newSeconds%10) !== parseInt(curSeconds%10)) {
            addBalls(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds%10));
        }

        //����ʱ��
        curShowTimeSeconds = newShowTimeSeconds;
    }
    updateBalls();
}

//����С����˶�
var updateBalls = function () {
    for (var i = 0; i < balls.length; ++i) {
        var aBall = balls[i];
        aBall.x += aBall.v_x;
        aBall.y += aBall.v_y;
        aBall.v_y += aBall.g;

        if (aBall.y + RADIUS >= WINDOW_HEIGHT) {
            aBall.y = WINDOW_HEIGHT - RADIUS;
            aBall.v_y = -aBall.v_y * 0.75;
        }

        if (aBall.x + RADIUS >= WINDOW_WIDTH) {
            aBall.x = WINDOW_WIDTH - RADIUS;
            aBall.v_x = -aBall.v_x * 1.5;
        }
    }

    //�����Ż���ɾ��������߳�������С��
    var count = 0;
    for (var i = 0; i < balls.length; ++i) {
        //�ж��ڻ����е�С��
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            balls[count++] = balls[i];
        }
    }
    while (balls.length > Math.min(1000, count)) {
        //ɾ�����һ��С��
        balls.pop();
    }
}

window.onload = function () {
    WINDOW_WIDTH = document.documentElement.clientWidth || document.body.clientWidth;
    WINDOW_HEIGHT = document.documentElement.clientHeight || document.body.clientHeight;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
    RADIUS = Math.round(WINDOW_WIDTH*4/5/108) - 1;

    var canvas = $("canvas"),
        context = canvas.getContext("2d");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    canvas.style.border = "1px solid #aaa";

    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(function () {
        render(context);
        update();
    }, 50);
}