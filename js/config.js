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
        this.userDom = document.getElementById("uname");
        this.signDom = document.getElementById("sign-out");
        this.loginDom = document.getElementById("login");
        this.singleDom = document.getElementById("singleplayer");
    }

    // Show configuration page
    start() {
        this.userDom.style.display = "block";
        this.signDom.style.display = "block";
        this.loginDom.style.display = "none";
        this.configurationDom.style.display = "flex";
        this.withdrawDom.style.display = "none";
        this.tableDom.style.display = "none";
        this.commandsDom.style.display = "none";
        this.singleDom.style.display = "none";

        if (this.versus === "computer") {
            this.singleDom.style.display = "flex";
            this.configurationDom.style.display = "none";
        } else if (this.versus === "user") {
            new login().start();
        }
    }

    singleplayerStart() {
        // Hide Configuration, show game commands
        this.configurationDom.style.display = "none";
        this.withdrawDom.style.display = "block";
        this.commandsDom.style.display = "flex";
        this.singleDom.style.display = "none";

        // Initialize new game
        winnerCount();
        restartGame();

        // Attribute colors to players
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

        // Show player color selection
        this.colorPlayedDom.textContent = "Playing as: " + color;
    }

    withdrawn() {
        increment(opponent);
        this.start();
    }
}

class online {
    constructor() {
        this.loginDom = document.getElementById("login");  
        this.configurationDom = document.getElementById("config");
        this.withdrawDom = document.getElementById("quit");
        this.commandsDom = document.getElementById("game-commands");
        this.colorPlayedDom = document.getElementById("color-played");
    }

    start() {
        isOnline = true;

        // Hide Configuration, show game commands
        this.configurationDom.style.display = "none";
        this.withdrawDom.style.display = "block";
        this.commandsDom.style.display = "flex";
        this.loginDom.style.display = "none";

        // Show player color selection
        this.colorPlayedDom.textContent = "Playing as: " + color;
    }
}