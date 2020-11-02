// resets board
function restartGame() {
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

// checks if someone can play
function hasMoves(playerToCheck, opponentToCheck) {
    let counter = 0;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (canPlay(i, j, playerToCheck, opponentToCheck)) {
                counter++;
            }
        }
    }
    if (counter > 0) return true;
}

// checks if anyone can move
function checkTurn() {
    let messageDom = document.getElementById("message");

    // pops a new message
    function message(string) {
        removeDivs("message");
        let warning = document.createElement("h1");
        messageDom.appendChild(warning);
        warning.setAttribute("id", "warning");
        let curWarning = document.getElementById("warning");
        let button = document.createElement("button");
        messageDom.appendChild(button);
        button.setAttribute("onclick", "new pop().close('message')");
        button.textContent = "Close";
        curWarning.textContent = string;
        new pop().open('message');
    }

    // alerts a game over
    function gameReset() {
        message("Game Over.");
        punctuation();
        restartGame();
        drawTable();
    }

    function cpu() {
        if (diff === "easy") {
            new actorPlay().easy();
        } else if (diff === "medium") {
            new actorPlay().medium();
        }
    }

    function gameOver() {
        if (!hasMoves(player, opponent) && !hasMoves(opponent, player)) return true;
    }

    function noComputer() {
        if (hasMoves(player, opponent) && !hasMoves(opponent, player)) return true;
    }

    function noPlayer() {
        if (!hasMoves(player, opponent) && hasMoves(opponent, player)) return true;
    }

    function allGood() {
        if (hasMoves(player, opponent) && hasMoves(opponent, player)) return true;
    }

    if (gameOver()) {
        gameReset();
    } else if (noComputer()) {
        message("CPU has no moves, your turn.");
    } else if (noPlayer()) {
        /*setTimeout(() => {  message("You have no moves, CPU's turn."); }, 2000);*/
        message("You have no moves, CPU's turn.");
        if (gameOver()) {
            gameReset();
        }
        cpu();
        if (gameOver()) {
            gameReset();
        }
    } else if (allGood()) {
        cpu();
        if (gameOver()) {
            gameReset();
        }
    }
}

// overlays an element
class pop {
    close(element) {
        let domElement = document.getElementById(element);
        let op = 1;  // initial opacity
        const timer = setInterval(function () {
            if (op <= 0.1) {
                clearInterval(timer);
                domElement.style.display = 'none';
            }
            domElement.style.opacity = op;
            domElement.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.5;
        }, 50);
    }

    open(element) {
        let domElement = document.getElementById(element);
        domElement.style.display = 'block';
        let op = 0.1;  // initial opacity
        domElement.classList.replace("close", "open");
        const timer = setInterval(function () {
            if (op >= 1) {
                clearInterval(timer);
            }
            domElement.style.opacity = op;
            domElement.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 10);
    }
}