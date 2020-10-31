// Initial state
let color;

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
            if(canPlay(i, j, player, opponent) && discs[i][j] === 0){
                discs[i][j] = 3;
            }

            const piece = document.createElement("div");

            // piece.onclick = function () {
            //     new actorPlay(color).updateState(i, j);
            // };
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
                  new actorPlay(color).updateState(i, j);
              };
                curSquare.className = "playable";
            }
        }
    }
}

function flip(toFlip, player) {
    for(let i = 0; i < toFlip.length; i++) {
        let point = toFlip.pop();
        discs[point[i].valueI][point[i].valueJ] = player;
    }
    drawTable();
}

// returns true is a position can be played
function canPlay(i, j, player, opponent) {
    let mi, mj, c;

    // moving up
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

    // moving down
    mi = i + 1;
    mj = j;
    c = 0;
    while (mi < 7 && discs[mi][mj] === opponent) {
        mi++;
        c++;
    }
    if (mi <= 7 && discs[mi][mj] === player && c > 0) return true;

    // moving left
    mi = i;
    mj = j - 1;
    c = 0;
    while (mi > 0 && discs[mi][mj] === opponent) {
        mj--;
        c++;
    }
    if (mi >= 0 && discs[mi][mj] === player && c > 0) return true;

    //move right
    mi = i;
    mj = j + 1;
    c = 0;
    while (mj < 7 && discs[mi][mj] === opponent) {
        mj++;
        c++;
    }
    if (mj <= 7 && discs[mi][mj] === player && c > 0) return true;

    //move up left
    mi = i - 1;
    mj = j - 1;
    c = 0;
    while (mi > 0 && mj > 0 && discs[mi][mj] === opponent) {
        mi--;
        mj--;
        c++;
    }
    if (mi >= 0 && mj >= 0 && discs[mi][mj] === player && c > 0) return true;

    //move up right
    mi = i - 1;
    mj = j + 1;
    c = 0;
    while (mi > 0 && mj < 7 && discs[mi][mj] === opponent) {
        mi--;
        mj++;
        c++;
    }
    if (mi >= 0 && mj <= 7 && discs[mi][mj] === player && c > 0) return true;

    //move down left
    mi = i + 1;
    mj = j - 1;
    c = 0;
    while (mi < 7 && mj > 0 && discs[mi][mj] === opponent) {
        mi++;
        mj--;
        c++;
    }
    if (mi <= 7 && mj >= 0 && discs[mi][mj] === player && c > 0) return true;

    //move down right
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
        drawTable();
    }
}

// Checks if you can play
class actorPlay {
    constructor(color) {
        this.color = color;
    }

    checkPlayer() {
        if (this.color === "whites") {
            return 2;
        } else if (this.color === "blacks") {
            return 1;
        }
    }

    checkOpponent() {
        if (this.color === "whites") {
            return 1;
        } else if (this.color === "blacks") {
            return 2;
        }
    }

    updateState(posI, posJ) {
        if (canPlay(posI, posJ, this.checkPlayer(), this.checkOpponent())) {
            discs[posI][posJ] = this.checkPlayer();
            drawTable(this.color);
        }
        this.easy();
    }

    easy() {
        let cpu = [];

        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                if(canPlay(i, j, this.checkOpponent(), this.checkPlayer())) {
                    cpu.push({valueI:i, valueJ:j});
                }
            }
        }

        const random = Math.floor(Math.random() * cpu.length);

        discs[cpu[random].valueI][cpu[random].valueJ] = this.checkOpponent();
        drawTable();
    }
}
