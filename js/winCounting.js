// gets current points, checks wins
function punctuation() {
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

// increments points
function increment(winner) {
    if (winner === "white") {
        pointsWhite += 1;
    } else {
        pointsBlack += 1;
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