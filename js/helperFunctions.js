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

// checks if anyone can move
function checkTurn() {
    // alerts a game over
    function gameOver() {
        alert("Game Over.");
        punctuation();
        restartGame();
        drawTable();
    }

    if (!hasMoves(player, opponent) && hasMoves(opponent, player)) {
        alert("You have no moves, CPU's turn.");
        if (!hasMoves(player, opponent) && !hasMoves(opponent, player)) {
            gameOver();
        } else {
            new actorPlay().easy();
            if (!hasMoves(player, opponent) && !hasMoves(opponent, player)) {
                gameOver();
            }
        }

    } else if (hasMoves(player, opponent) && !hasMoves(opponent, player)) {
        alert("CPU has no moves, your turn.");
        if (!hasMoves(player, opponent) && !hasMoves(opponent, player)) {
            gameOver();
        }
    } else if (hasMoves(player, opponent) && hasMoves(opponent, player)) {
        new actorPlay().easy();
        if (!hasMoves(player, opponent) && !hasMoves(opponent, player)) {
            gameOver();
        }
    } else if (!hasMoves(player, opponent) && !hasMoves(opponent, player)) {
        gameOver();
    }
}

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