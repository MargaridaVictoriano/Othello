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

    currentBoard = [
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "light", "dark", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "dark", "light", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"]
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

// Draws table
function drawTable2() {
    // When server timeouts it does nothing
    if (currentBoard === null) {
        return;
    }

    removeDivs("table");
    const table = document.getElementById("table");
    table.style.display = "flex";

    for (let i = 0; i < 8; i++) {
        let row = document.createElement("div");
        table.appendChild(row);
        row.setAttribute("id", "row" + i);
        let curRow = document.getElementById("row" + i);

        for (let j = 0; j < 8; j++) {
            if (canPlay2(i, j, player, opponent) && currentBoard[i][j] === "empty") {
                currentBoard[i][j] = "playable";
            }
            if (!(canPlay2(i, j, player, opponent)) && currentBoard[i][j] === "playable" && currentBoard[i][j] !== "dark" && currentBoard[i][j] !== "light") {
                currentBoard[i][j] = "empty";
            }
            const piece = document.createElement("div");

            piece.setAttribute("id", "square" + i + j);
            piece.setAttribute("class", "square");
            curRow.appendChild(piece);

            const curSquare = document.getElementById("square" + i + j);
            if (currentBoard[i][j] === "light") {
                let whiteSquare = document.createElement("div");
                curSquare.appendChild(whiteSquare);
                whiteSquare.className = "whites";
            } else if (currentBoard[i][j] === "dark") {
                let blackSquare = document.createElement("div");
                curSquare.appendChild(blackSquare);
                blackSquare.className = "blacks";
            } else if (currentBoard[i][j] === "playable") {
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

// pops a new message
function message(string) {
    // removes prior message or animation
    new animations().forceClose("message");
    removeDivs("message");
    // create new
    let messageDom = document.getElementById("message");
    removeDivs("message");
    let warning = document.createElement("h1");
    messageDom.appendChild(warning);
    warning.setAttribute("id", "warning");
    let curWarning = document.getElementById("warning");
    let button = document.createElement("button");
    messageDom.appendChild(button);
    button.setAttribute("onclick", "new animations().close('message')");
    button.textContent = "Close";
    curWarning.textContent = string;
    new animations().open('message');
}

// checks if anyone can move
function checkTurn() {
    // alerts a game over
    function gameReset() {
        message("Game Over.");
        punctuation();
        restartGame();
        drawTable();
        if (player === 2) {
            cpu();
        }
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
        message("You have no moves, CPU's turn.");
        if (gameOver()) {
            gameReset();
        }
        cpu();
        if (gameOver()) {
            gameReset();
        }
    } else if (allGood()) {
        if (gameOver()) {
            gameReset();
        }
        cpu();
        if (gameOver()) {
            gameReset();
        }
    }
}

function topRank(array) {
    removeDivs("ranking");
    const table = document.createElement('table');
    const head = document.createElement('thead');
    const firstRow = document.createElement('tr');
    const names = document.createElement('th');
    names.textContent = "Nickname";
    const victories = document.createElement('th');
    victories.textContent = "Victories";
    const games = document.createElement('th');
    games.textContent = "Games Played";
    firstRow.appendChild(names);
    firstRow.appendChild(victories);
    firstRow.appendChild(games);
    head.appendChild(firstRow);
    table.appendChild(head);

    for (let i = 0; i < array.length; i++) {
        const row = document.createElement('tr');

        const cell1 = document.createElement('td');
        cell1.textContent = array[i].nick;

        const cell2 = document.createElement('td');
        cell2.textContent = array[i].victories;

        const cell3 = document.createElement('td');
        cell3.textContent = array[i].games;

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);

        table.appendChild(row);
    }

    document.getElementById("ranking").appendChild(table);
    let button = document.createElement("button");
    document.getElementById("ranking").appendChild(button);
    button.setAttribute("onclick", "new animations().close('ranking')");
    button.textContent = "Close";
}