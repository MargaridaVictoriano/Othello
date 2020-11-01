// Initial state
let color;
let pointsWhite = 0;
let pointsBlack = 0;
let player;
let opponent;

let discs = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

// Removes all children of a div
function removeDivs(elementId) {
    const element = document.getElementById(elementId);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Draws table
function drawTable() {
    removeDivs("table");
    const table = document.getElementById("table");
    table.style.display = "flex";

    let player;
    let opponent;

    if (color === "whites") {
        player = 2;
        opponent = 1;
    } else if (color === "blacks") {
        player = 1;
        opponent = 2;
    }

    for (let i = 0; i < 8; i++) {
        let row = document.createElement("div");
        table.appendChild(row);
        row.setAttribute("id", "row" + i);
        let curRow = document.getElementById("row" + i);

        for (let j = 0; j < 8; j++) {
            if (canPlay(i, j, player, opponent) && discs[i][j] === 0) {
                discs[i][j] = 3;
            }
            if (!(canPlay(i, j, player, opponent)) && discs[i][j] === 3 && discs[i][j] !== 1 && discs[i][j] !== 2) {
                discs[i][j] = 0;
            }
            const piece = document.createElement("div");

            piece.setAttribute("id", "square" + i + j);
            piece.setAttribute("class", "square");
            curRow.appendChild(piece);

            const curSquare = document.getElementById("square" + i + j);
            if (discs[i][j] === 2) {
                let whiteSquare = document.createElement("div");
                curSquare.appendChild(whiteSquare);
                whiteSquare.className = "whites";
            } else if (discs[i][j] === 1) {
                let blackSquare = document.createElement("div");
                curSquare.appendChild(blackSquare);
                blackSquare.className = "blacks";
            } else if (discs[i][j] === 3) {
                piece.onclick = function () {
                    new actorPlay().updateState(i, j);
                };
                curSquare.className = "playable";
            }
        }
    }
}

function flip(toFlip, player) {
    for (let i = 0; i < toFlip.length; i++) {
        let point = toFlip.pop();
        discs[point.valueI][point.valueJ] = player;
    }
    drawTable();
}

class flipplin {
    reversePlay(i, j, player, opponent) {
        let toBeFlipped = [];
        let mi, mj, c;
        // moving right IT WORKS YAY
        mi = i - 1;
        mj = j;
        c = 0;
        while (mi > 0 && discs[mi][mj] === opponent) {
            mi--;
            c++;
        }
        if (mi >= 0 && discs[mi][mj] === player && c > 0) {
            mi++;
            console.log("YAY moving right");
            while (discs[mi][mj] === opponent) {
                toBeFlipped.push({valueI: mi, valueJ: mj});
                mi++;
                // console.log(toBeFlipped.toString());
                // console.log(discs);
            }
        }
        //moving left YAY IT WORKS
        mi = i + 1;
        mj = j;
        c = 0;
        while (mi < 7 && discs[mi][mj] === opponent) {
            mi++;
            c++;
        }
        if (mi <= 7 && discs[mi][mj] === player && c > 0) {
            console.log("YAY moving left");
            mi--;
            while (discs[mi][mj] === opponent) {
                toBeFlipped.push({valueI: mi, valueJ: mj});
                mi--;
                //  console.log(toBeFlipped.toString());
                //  console.log(discs);
            }
        }
        // moving down IT WORKS YAY
        mi = i;
        mj = j - 1;
        c = 0;
        while (mi > 0 && discs[mi][mj] === opponent) {
            mj--;
            c++;
        }
        if (mi >= 0 && discs[mi][mj] === player && c > 0) {
            console.log("YAY moving down");
            mj++;
            while (discs[mi][mj] === opponent) {
                toBeFlipped.push({valueI: mi, valueJ: mj});
                mj++;
                // console.log(toBeFlipped.toString());
                // console.log(discs);
            }
        }

        //move up IT WORKS YAY !
        mi = i;
        mj = j + 1;
        c = 0;
        while (mj < 7 && discs[mi][mj] === opponent) {
            mj++;
            c++;
        }
        if (mj <= 7 && discs[mi][mj] === player && c > 0) {
            console.log("YAY moving up");
            mj--;
            while (discs[mi][mj] === opponent) {
                toBeFlipped.push({valueI: mi, valueJ: mj});
                mj--;
                // console.log(toBeFlipped.toString());
                // console.log(discs);
            }
        }

        //move up right YAY WOKRS
        mi = i - 1;
        mj = j + 1;
        c = 0;
        while (mi > 0 && mj < 7 && discs[mi][mj] === opponent) {
            mi--;
            mj++;
            c++;
        }
        if (mi >= 0 && mj <= 7 && discs[mi][mj] === player && c > 0) {
            console.log("YAY moving up right");
            mj--;
            mi++;
            while (discs[mi][mj] === opponent) {
                toBeFlipped.push({valueI: mi, valueJ: mj});
                mj--;
                mi++;
                // console.log(toBeFlipped.toString());
                // console.log(discs);
            }
        }

        //move up left YAY IT WORKS
        mi = i + 1;
        mj = j + 1;
        c = 0;
        while (mi < 7 && mj < 7 && discs[mi][mj] === opponent) {
            mi++;
            mj++;
            c++;
        }
        if (mi <= 7 && mj <= 7 && discs[mi][mj] === player && c > 0) {
            console.log("YAY moving up left");
            mi--;
            mj--;
            while (discs[mi][mj] === opponent) {
                toBeFlipped.push({valueI: mi, valueJ: mj});
                mi--;
                mj--;
                // console.log(toBeFlipped.toString());
                // console.log(discs);
            }
        }

        //move down right YAY WORKS
        mi = i - 1;
        mj = j - 1;
        c = 0;
        while (mi > 0 && mj > 0 && discs[mi][mj] === opponent) {
            mi--;
            mj--;
            c++;
        }
        if (mi >= 0 && mj >= 0 && discs[mi][mj] === player && c > 0) {
            console.log("YAY moving down right");
            mi++;
            mj++;
            while (discs[mi][mj] === opponent) {
                toBeFlipped.push({valueI: mi, valueJ: mj});
                mi++;
                mj++;
                // console.log(toBeFlipped.toString());
                // console.log(discs);
            }
        }

        //moving down left YAY it works
        mi = i + 1;
        mj = j - 1;
        c = 0;
        while (mi < 7 && mj > 0 && discs[mi][mj] === opponent) {
            mi++;
            mj--;
            c++;
        }
        if (mi <= 7 && mj >= 0 && discs[mi][mj] === player && c > 0) {
            console.log("YAY moving down left");
            mi--;
            mj++;
            while (discs[mi][mj] === opponent) {
                toBeFlipped.push({valueI: mi, valueJ: mj});
                mi--;
                mj++;
                // console.log(toBeFlipped.toString());
                // console.log(discs);
            }
        }

        flip(toBeFlipped, player);
    }
}

// returns true is a position can be played
function canPlay(i, j, player, opponent) {
    let mi, mj, c;

    if (discs[i][j] === opponent || discs[i][j] === player) {
        return false;
    } else {
        // moving right
        mi = i - 1;
        mj = j;
        c = 0;
        while (mi > 0 && discs[mi][mj] === opponent) {
            mi--;
            c++;
        }
        if (mi >= 0 && discs[mi][mj] === player && c > 0) {
            return true;
        }

        // moving left
        mi = i + 1;
        mj = j;
        c = 0;
        while (mi < 7 && discs[mi][mj] === opponent) {
            mi++;
            c++;
        }
        if (mi <= 7 && discs[mi][mj] === player && c > 0) return true;

        // moving down
        mi = i;
        mj = j - 1;
        c = 0;
        while (mi > 0 && discs[mi][mj] === opponent) {
            mj--;
            c++;
        }
        if (mi >= 0 && discs[mi][mj] === player && c > 0) return true;

        //move up
        mi = i;
        mj = j + 1;
        c = 0;
        while (mj < 7 && discs[mi][mj] === opponent) {
            mj++;
            c++;
        }
        if (mj <= 7 && discs[mi][mj] === player && c > 0) return true;

        //move up right
        mi = i - 1;
        mj = j - 1;
        c = 0;
        while (mi > 0 && mj > 0 && discs[mi][mj] === opponent) {
            mi--;
            mj--;
            c++;
        }
        if (mi >= 0 && mj >= 0 && discs[mi][mj] === player && c > 0) return true;

        //move up left
        mi = i - 1;
        mj = j + 1;
        c = 0;
        while (mi > 0 && mj < 7 && discs[mi][mj] === opponent) {
            mi--;
            mj++;
            c++;
        }
        if (mi >= 0 && mj <= 7 && discs[mi][mj] === player && c > 0) return true;

        //move down right
        mi = i + 1;
        mj = j - 1;
        c = 0;
        while (mi < 7 && mj > 0 && discs[mi][mj] === opponent) {
            mi++;
            mj--;
            c++;
        }
        if (mi <= 7 && mj >= 0 && discs[mi][mj] === player && c > 0) return true;

        //move down left
        mi = i + 1;
        mj = j + 1;
        c = 0;
        while (mi < 7 && mj < 7 && discs[mi][mj] === opponent) {
            mi++;
            mj++;
            c++;
        }
        if (mi <= 7 && mj <= 7 && discs[mi][mj] === player && c > 0) return true;

        return false;
    }
}

function hasMoves(playerToCheck, opponentToCheck) {
    let counter = 0;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (canPlay(i, j, playerToCheck, opponentToCheck)) {
                counter++;
            }
        }
    }
    if(counter > 0) return true;
}

function checkTurn(){
    if(!hasMoves(player, opponent) && hasMoves(opponent, player)) {
        alert("You have no moves, CPU's turn.");
        new actorPlay().easy();
    } else if(hasMoves(player, opponent) && !hasMoves(opponent, player)) {
        alert("CPU has no moves, your turn.");
    }
    else if(hasMoves(player, opponent) && hasMoves(opponent, player)) {
        new actorPlay().easy();
        if (!hasMoves(player, opponent) && !hasMoves(opponent, player)) {
            alert("Game Over.");
            punctuation();
            restartGame();
        }
    }
    else if (!hasMoves(player, opponent) && !hasMoves(opponent, player)) {
        alert("Game Over.");
        punctuation();
        restartGame();
    }
}

function restartGame() {
    // Resets board
    discs = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
}

function punctuation() {
    removeDivs("points");
    const parent = document.getElementById("points");
    const whiteCounter = document.createElement("div");
    const blackCounter = document.createElement("div");
    whiteCounter.setAttribute("id", "white-counter");
    blackCounter.setAttribute("id", "black-counter");
    const reset = document.createElement("div");

    parent.appendChild(whiteCounter);
    parent.appendChild(blackCounter);
    parent.appendChild(reset);

    whiteCounter.innerText = pointsWhite.toString();
    blackCounter.innerText = pointsBlack.toString();

    let nWhites = 0;
    let nBlacks = 0;


    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (discs[i][j] === 1) {
                nBlacks++;
            } else if (discs[i][j] === 2) {
                nWhites++;
            }
        }
    }

    if (nWhites >= nBlacks) {
        increment("white");
    }

    if (nBlacks >= nWhites) {
        increment("black");
    }
}

function increment(winner) {
    const whiteCounter = document.getElementById("white-counter");
    const blackCounter = document.getElementById("black-counter");

    if (winner === "white") {
        pointsWhite += 1;
    } else {
        pointsBlack += 1;
    }

    whiteCounter.textContent = pointsWhite;
    blackCounter.textContent = pointsBlack;
}


class login {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    start() {
        // Makes account info invisible
        document.getElementById("sign-out").style.display = "none";
        document.getElementById("uname").style.display = "none";
        document.getElementById("config").style.display = "none";
        document.getElementById("table").style.display = "none";
        // Makes login form Visible
        document.getElementById("login").style.display = "block";
        // Removes the table
        removeDivs('table');
        // Resets board
        restartGame();
        color = null;
    }

    enter() {
        // Get info from form
        this.username = document.getElementById("username").value
        this.password = document.getElementById("password").value

        if (this.username === "" && this.password === "") {
            document.getElementById("uname").innerHTML = this.username;
            document.getElementById("uname").style.display = "block";
            document.getElementById("sign-out").style.display = "block";
            document.getElementById("login").style.display = "none";
            new config().start();
        }
    }
}

class config {
    constructor() {
        this.versus = document.getElementById("versus").value;
        this.color = document.getElementById("color").value;
        this.difficulty = document.getElementById("difficulty").value;
    }

    start() {
        document.getElementById("config").style.display = "block";
    }

    beginNewGame() {
        document.getElementById("config").style.display = "none";

        color = this.color;
        if (color === "whites") {
            player = 2;
            opponent = 1;
        } else if (color === "blacks") {
            player = 1;
            opponent = 2;
        }

        if (opponent === 1) {
            new actorPlay().easy();
        }

        drawTable();
    }
}

// Checks if you can play
class actorPlay {
    updateState(posI, posJ) {
        if (canPlay(posI, posJ, player, opponent)) {
            discs[posI][posJ] = player;
            drawTable();
        }
        new flipplin().reversePlay(posI, posJ, player, opponent);
        drawTable();

        // check if computer has moves and you don't
        checkTurn();
    }

    easy() {
        let cpu = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (canPlay(i, j, opponent, player)) {
                    cpu.push({valueI: i, valueJ: j});
                }
            }
        }
        const random = Math.floor(Math.random() * cpu.length);
        discs[cpu[random].valueI][cpu[random].valueJ] = opponent;
        console.log("CPU move: " + cpu[random].valueI + " " + cpu[random].valueJ);
        new flipplin().reversePlay(cpu[random].valueI, cpu[random].valueJ, opponent, player);
        drawTable();
    }
}