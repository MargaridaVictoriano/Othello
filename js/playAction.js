// Checks if you can play
class actorPlay {
    constructor() {
        this.max = 0;
    }

    updateState(posI, posJ) {
        if (vs === "user") {
            if (canPlay2(posI, posJ, player, opponent)) {
                currentBoard[posI][posJ] = player;
                drawTable2();
            }
            reversePlay2(posI, posJ, player, opponent);
            drawTable2();
            notify(posI, posJ);
        }
        else if (vs === "computer") {
            if (canPlay(posI, posJ, player, opponent)) {
                discs[posI][posJ] = player;
                drawTable();
            }
            reversePlay(posI, posJ, player, opponent);
            drawTable();
            // check if computer has moves and you don't
            checkTurn();
        }
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
        reversePlay(cpu[random].valueI, cpu[random].valueJ, opponent, player);
        drawTable();
    }

    medium() {
        let highestReward = {valueI: 0, valueJ: 0};
        let reward = [
            [120, -20, 20, 5, 5, 20, -20, 120],
            [-20, -40, -5, -5, -5, -5, -40, -20],
            [20, -5, 15, 3, 3, 15, -5, 20],
            [5, -5, 3, 3, 3, 3, -5, 5],
            [5, -5, 3, 3, 3, 3, -5, 5],
            [20, -5, 15, 3, 3, 15, -5, 20],
            [-20, -40, -5, -5, -5, -5, -40, -20],
            [120, -20, 20, 5, 5, 20, -20, 120]
        ];

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (canPlay(i, j, opponent, player) && discs[i][j] !== opponent && discs[i][j] === player) {
                    if (reward[i][j] >= this.max) {
                        this.max = reward[i][j];
                        highestReward.valueI = i;
                        highestReward.valueJ = j;
                    }
                }
            }
        }

        if (!canPlay(highestReward.valueI, highestReward.valueJ, opponent, player)) {
            this.easy();
        } else {
            discs[highestReward.valueI][highestReward.valueJ] = opponent;
            console.log("CPU move: " + highestReward.valueI + " " + highestReward.valueJ);
            reversePlay(highestReward.valueI, highestReward.valueJ, opponent, player);
            drawTable();
        }
    }
}