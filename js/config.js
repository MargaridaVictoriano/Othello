// Configuration page
class config {
    constructor() {
        this.versus = document.getElementById("versus").value;
        this.color = document.getElementById("color").value;
        this.difficulty = document.getElementById("difficulty").value;
    }

    start() {
        document.getElementById("config").style.display = "block";
        document.getElementById("quit").style.display = "none";
        document.getElementById("table").style.display = "none";
        document.getElementById("game-commands").style.display = "none";
    }

    beginNewGame() {
        // Hide Configuration, show game commands
        document.getElementById("config").style.display = "none";
        document.getElementById("quit").style.display = "block";
        document.getElementById("game-commands").style.display = "flex";

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

        // Initialize new game
        winnerCount();
        restartGame();
        drawTable();

        document.getElementById("color-played").textContent = "Playing: " + this.color;
    }
}