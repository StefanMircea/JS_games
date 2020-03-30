var canv = document.getElementById("canvas");
var ctx = canv.getContext("2d");
var score = document.getElementById("Score");
document.addEventListener("keydown", fly);
document.addEventListener("onclick", fly);

var k = 0;//var care reprezint nr de cadre de cand a fost apasat enter
var game_speed = 11;//nr de milisecunde la care se reprezinta un cadru
var gap = 90;//distanta dintre partea de sus si cea de jos a tuburilor
var grav = 1.5;//nr de unitati cu care sa cada pasarea
var bx = 10;//bird x coord
var by = 150;///bird y coord
var pipe = [];//vectorul in care pastram coord_x si coord_ y a tuburilor
var score_number = 0;
var start = 0;
var fly_frames = 10;
var jump_height = 15;
var replay_nr = 0;
pipe[0] = {
    x: canv.width,
    y: 0
}


var bird = new Image();
var bird_up = new Image();
var bird_down = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

var fly_sound = new Audio();
var score_sound = new Audio();

fly_sound.src = "sounds/fly.mp3";
score_sound.src = "sounds/score.mp3";

bg.src = "images/bg.png";
bird_up.src = "images/bird_up.png";
bird_down.src = "images/bird_down.png"
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
fg.src = "images/fg.png";
bird.src = "images/bird.png";

// dupa reset se acceseaza aceasta functie pentru a se readuce param initiali
function setup() {
    score_number = 0;
    gap = 90;
    grav = 1.5;
    bx = 10;
    by = 150;
    k = 0;

    pipe = [];
    pipe[0] = {
        x: canv.width,
        y: 0
    }

}

function replay() {
    if (replay_nr == 1 && start == 0)
        game();
}

//functie ce este apelata atunci se apasa pe vreo tasta
function fly(event) {
    if (start == 0) {
        start = 1;//ca sa nu putem da start la nesfarsit
        game();
    }
    else {
        k = fly_frames;//numarul de cadre in care o sa se desfasoare zborul in sus
        by -= jump_height / 2;//un boost de inceput de zbor in sus, face jocul mai bun
    }
}

//functie ce este apelata atunci cand se apasa unde buton al unui mouse, este eceeasi ca fly
function fly2(event) {
    if (start == 0 && replay_nr == 0) {
        start = 1;
        game();
    }
    else {
        k = fly_frames;
        by -= jump_height / 2;
    }
}

//functie apelata pentru a afisa tuburile pe ecran atunci cand se pierde jocul
//si care initializeaza optiunea de replay
function game_over() {
    replay_nr = 1;
    for (var i = 0; i < pipe.length; i++) {

        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipeNorth.height + pipe[i].y + gap);
    }
    ctx.drawImage(fg, 0, canv.height - fg.height);
    ctx.drawImage(bird, bx, by);
    setup();
    setTimeout(make_start_0, 500);//aceasta functie nu lasa jucatorul sa reseteze din greseala jocul
}

//nu am gasit o varianta mai bune pentru a face var start 0 dupa o perioada de timp
// ca sa nu dam restart din greseala imediat dupa e am pierdut
function make_start_0() {
    start = 0;
}

//utilizam aceasta functie pentru a avea ceva pe ecran inainte de a se da start
function draw_init() {
    bg.onload = function () {
        ctx.drawImage(bg, 0, 0);
    }
    fg.onload = function () {
        ctx.drawImage(fg, 0, canv.height - fg.height)
    }
    bird.onload = function () {
        ctx.drawImage(bird, bx, by);
    }
}

function game() {
    ctx.drawImage(bg, 0, 0);//deseneaza background-ul
    for (var i = 0; i < pipe.length; i++) {
        //checker de coliziune
        if ((by + bird.height >= pipeNorth.height + pipe[i].y + gap || by <= pipeNorth.height + pipe[i].y) && pipe[i].x <= bx + bird.width && bx <= pipe[i].x + pipeSouth.width) {
            game_over();
            return;
        }
        if (by + bird.height > canv.height - fg.height) {
            game_over();
            return;
        }
        if (by < 0) {
            game_over();
            return;
        }
        //adaugare de noi tuburi in vector
        //125 este distanta dintre tuburi
        if (pipe[i].x == canv.width - 125) {
            pipe.push({
                x: canv.width,//fiecare nou tub incepe din partea stanga a ecranului
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height//coord y va fi cu minus astfel incat doar o parte din tub sa se afle in ecran
            });
        }
        //incrementam scorul atunci cand coor x a vreunui tub este egala cu cea a pasarii
        if (pipe[i].x == bx) {
            score_number++;
            score_sound.play();
        }
        //eliminam din vec tuburile ce au iesit din canvas
        if (pipe[i].x + pipeNorth.width == -5)
            pipe.splice(0, 1);
        //miscam toata tuburile cu 1 la stanga
        pipe[i].x -= 1;
        //desenam tuburile
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipeNorth.height + pipe[i].y + gap);
    }
    ctx.drawImage(fg, 0, canv.height - fg.height);//deseneaza foreground-ul
    //ctx.drawImage(bird, bx, by);//deseneaza pasarea
    //rulam sunetul de zbor doar in primul cadru de zbor
    if (k == fly_frames)
        fly_sound.play();
    //cat timp pasarea zboara in sus desenam imaginea pasarii rotita in sus
    if (k == 0) {
        by += grav;
        ctx.drawImage(bird_down, bx, by);
    }
    //cat timp pasarea cade desenam imaginea pasarii rotita in jos
    if (k > 0) {
        k--;
        by -= jump_height / fly_frames;
        ctx.drawImage(bird_up, bx, by);
    }
    //modifica scorul
    score.innerHTML = "Score: " + score_number;
    //aici pute seta cat de repede sa se miste jocul
    setTimeout(game, game_speed);
    //console.log(pressed_enter);
    // console.log(by)
}

draw_init();
