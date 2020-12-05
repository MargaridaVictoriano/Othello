// gets current points, checks wins
function punctuation() {
    let nWhites = 0;
    let nBlacks = 0;

    if (isOnline) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (currentBoard[i][j] === "dark") {
                    nBlacks++;
                } else if (currentBoard[i][j] === "light") {
                    nWhites++;
                }
            }
        }
        if (nWhites >= nBlacks) {
            increment("light");
        }
        if (nBlacks >= nWhites) {
            increment("dark");
        }
    } else if(!isOnline) {
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
}

// increments points
function increment(winner) {
    if (isOnline) {
        if (winner === "light") {
            pointsWhite += 1;
        } else if (winner === "dark") {
            pointsBlack += 1;
        }
    } else if(!isOnline) {
        if (winner === "white") {
            pointsWhite += 1;
        } else if (winner === "black") {
            pointsBlack += 1;
        }
    }
    winnerCount();
}

// send to html
function winnerCount() {
    const whiteCounter = document.getElementById("white-classification");
    const blackCounter = document.getElementById("black-classification");
    whiteCounter.textContent = pointsWhite;
    blackCounter.textContent = pointsBlack;
}