window.onload = function () {
    canv = document.getElementById("can");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    game();
}

interval = 250;//viteza initiala jocului, se actualizeaza odata la 250ms
px = py = 10;//pozitioa initiala a snake-ului
tc = 20;//numarul de patrate pe o linie
gs = 20;//dimensiunea patratelor
ax = Math.floor(Math.random() * tc);//pozitia initiala in grid a marului
ay = Math.floor(Math.random() * tc);
xv = yv = 0;//directia initiala
tail = [{ x: px, y: py }];//vectorul coada
a = 0;//numarul de mere mancate

function game() {
    px += xv;
    py += yv;
    //change the direction of the snake
    if (px < 0) {
        px = tc - 1;
    }
    if (px > tc - 1) {
        px = 0;
    }
    if (py < 0) {
        py = tc - 1;
    }
    if (py > tc - 1) {
        py = 0;
    }
    //display canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);
    //display stake with tail
    ctx.fillStyle = "lime";
    for (var i = 0; i < tail.length; i++) {
        ctx.fillRect(tail[i].x * gs + 1, tail[i].y * gs - 1, gs - 2, gs - 2);
        //if it bumps itself make the tail equal with 1 and reset the number of apples eaten   
        if (tail[i].x == px && tail[i].y == py && i != tail.length - 1) {
            tail.splice(0, tail.length - 1);
            interval = 250;
            a = 0;
            break;
        }
    }
    //display apple
    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs + 1, ay * gs - 1, gs - 2, gs - 2);
    //if the snake finds an apple enlarge the tail and create new apple position also speed up the game
    if (ax == px && ay == py) {
        a++;
        if (interval > 50)
            interval -= 10;
        tail.push({ x: px, y: py });
        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * tc);
    } else {
        //add new position and delete the last one
        tail.push({ x: px, y: py });
        tail.shift();
    }
    //display score and clear it before displaying again
    ctx.clearRect(400, 0, 200, 400)
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + a, 410, 30)
    //update the speed of the game
    setTimeout(game, interval)
}

function keyPush(evt) {
    switch (evt.keyCode) {
        case 37:
            xv = -1; yv = 0;
            break;
        case 38:
            xv = 0; yv = -1;
            break;
        case 39:
            xv = 1; yv = 0;
            break;
        case 40:
            xv = 0; yv = 1;
            break;
    }

}