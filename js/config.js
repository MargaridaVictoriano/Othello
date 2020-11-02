// Configuration page
class config {
    constructor() {
        this.versus = document.getElementById("versus").value;
        this.color = document.getElementById("color").value;
        this.difficulty = document.getElementById("difficulty").value;
        this.configurationDom = document.getElementById("config");
        this.withdrawDom = document.getElementById("quit");
        this.tableDom = document.getElementById("table");
        this.commandsDom = document.getElementById("game-commands");
        this.colorPlayedDom = document.getElementById("color-played");
    }

    // Show configuration page
    start() {
        this.configurationDom.style.display = "block";
        this.withdrawDom.style.display = "none";
        this.tableDom.style.display = "none";
        this.commandsDom.style.display = "none";
    }

    beginNewGame() {
        // Hide Configuration, show game commands
        this.configurationDom.style.display = "none";
        this.withdrawDom.style.display = "block";
        this.commandsDom.style.display = "flex";

        // Attribute colors to players
        color = this.color;
        if (color === "whites") {
            player = 2;
            opponent = 1;
        } else if (color === "blacks") {
            player = 1;
            opponent = 2;
        }

        // Initialize new game
        winnerCount();
        restartGame();
        if (opponent === 1) {
            new actorPlay().easy();
        }
        drawTable();

        // Show player color selection
        this.colorPlayedDom.textContent = "Playing as: " + this.color;
    }
}