player = "O";
square1 = document.getElementById("square1");
square2 = document.getElementById("square2");
square3 = document.getElementById("square3");
square4 = document.getElementById("square4");
square5 = document.getElementById("square5");
square6 = document.getElementById("square6");
square7 = document.getElementById("square7");
square8 = document.getElementById("square8");
square9 = document.getElementById("square9");
stat = document.getElementById("stat");

function checkwin() {
    //row check
    if (square1.innerHTML !== "" && square1.innerHTML === square2.innerHTML && square1.innerHTML === square3.innerHTML)
        won(square1, square2, square3);
    else
        if (square4.innerHTML !== "" && square5.innerHTML === square4.innerHTML && square6.innerHTML === square4.innerHTML)
            won(square4, square5, square6);
        else
            if (square7.innerHTML !== "" && square7.innerHTML === square8.innerHTML && square7.innerHTML === square9.innerHTML)
                won(square7, square8, square9);
            else //column check
                if (square1.innerHTML !== "" && square1.innerHTML === square4.innerHTML && square1.innerHTML === square7.innerHTML)
                    won(square1, square4, square7);
                else
                    if (square2.innerHTML !== "" && square2.innerHTML === square5.innerHTML && square2.innerHTML === square8.innerHTML)
                        won(square2, square5, square8);
                    else
                        if (square3.innerHTML !== "" && square3.innerHTML === square6.innerHTML && square3.innerHTML === square9.innerHTML)
                            won(square3, square6, square9);
                        else//diagonal check
                            if (square1.innerHTML !== "" && square1.innerHTML === square5.innerHTML && square1.innerHTML === square9.innerHTML)
                                won(square1, square5, square9);
                            else
                                if (square3.innerHTML !== "" && square3.innerHTML === square5.innerHTML && square3.innerHTML === square7.innerHTML)
                                    won(square3, square5, square7);
}

function won(a, b, c) {
    a.style.background = "orange";
    b.style.background = "orange";
    c.style.background = "orange";
    stat.innerHTML = a.innerHTML + " WON";
    player=a.innerHTML;
}

var squares = document.querySelectorAll(".square");

for (var i = 0; i < squares.length; i++)
    squares[i].onclick = function () {
        if (player == "X" && this.innerHTML === "" && JSON.parse(JSON.stringify(stat.innerHTML)) != player + " WON") {
            stat.innerHTML = "O's turn";
            this.innerHTML = "X";
            player = "O";
            checkwin();
        }
        if (player == "O" && this.innerHTML === "" && JSON.parse(JSON.stringify(stat.innerHTML)) != player + " WON") {
            stat.innerHTML = "X's turn";
            this.innerHTML = "O";
            player = "X";
            checkwin();
        }
    }

function replay() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].innerHTML = "";
        squares[i].style.background = "white";
    }
    player = "O";
    stat.innerHTML = "GO";
}

