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
        this.configurationDom.style.display = "flex";
        this.withdrawDom.style.display = "none";
        this.tableDom.style.display = "none";
        this.commandsDom.style.display = "none";
    }

    beginNewGame() {
        // Hide Configuration, show game commands
        this.configurationDom.style.display = "none";
        this.withdrawDom.style.display = "block";
        this.commandsDom.style.display = "flex";

        // Initialize new game
        winnerCount();
        restartGame();
        vs = this.versus;
        // Attribute colors to players
        if (vs === "computer") {
            color = this.color;
            diff = this.difficulty;
            if (color === "light") {
                player = 2;
                opponent = 1;
            } else if (color === "dark") {
                player = 1;
                opponent = 2;
            }
            if (opponent === 1) {
                if (this.difficulty === "easy") {
                    new actorPlay().easy();
                } else if (this.difficulty === "medium") {
                    new actorPlay().medium();
                }
            }
            drawTable();
        }

        if (vs === "user") {
            join(group, nick, pass);
            if (color === "light") {
                player = "light";
                opponent = "dark";
            } else if (color === "dark") {
                player = "dark";
                opponent = "light";
            }
            drawTable2();
        }

        // Show player color selection
        this.colorPlayedDom.textContent = "Playing as: " + color;
    }
}