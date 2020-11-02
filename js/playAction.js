// Checks if you can play
class actorPlay {
    updateState(posI, posJ) {
        if (canPlay(posI, posJ, player, opponent)) {
            discs[posI][posJ] = player;
            drawTable();
        }
        reversePlay(posI, posJ, player, opponent);
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
        reversePlay(cpu[random].valueI, cpu[random].valueJ, opponent, player);
        drawTable();
    }
}