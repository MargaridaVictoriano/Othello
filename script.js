class login {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    start() {
        // Makes account info invisible
        document.getElementById("sign-out").style.display = "none";
        document.getElementById("uname").style.display = "none";
        document.getElementById("config").style.display = "none";
        // Makes login form Visible
        document.getElementById("login").style.display = "block";
        // Removes the table
        this.removeDivs('inner-table');
    }

    enter() {
        // Get info from form
        this.username = document.getElementById("username").value
        this.password = document.getElementById("password").value

        if (this.username === "admin" && this.password === "password") {
            document.getElementById("uname").innerHTML = this.username;
            document.getElementById("uname").style.display = "block";
            document.getElementById("sign-out").style.display = "block";
            document.getElementById("login").style.display = "none";
            new config().start();
        }
    }

    removeDivs(elementId) {
        // Removes an element and it's children from the document
        const element = document.getElementById(elementId);
        element.parentNode.removeChild(element);
    }
}

class config {
    constructor(versus, color, difficulty) {
        this.versus = versus;
        this.color = color;
        this.difficulty = difficulty;
    }

    start() {
        document.getElementById("config").style.display = "block";
    }

    beginNewGame() {
        document.getElementById("config").style.display = "none";
        this.genDivs();
    }

    genDivs() {
        const table = document.getElementById("table");
        table.innerHTML += '<div id="game-info">';
        table.innerHTML += '<div id="inner-table">';
        const innerTable = document.getElementById("inner-table");
        const gameInfo = document.getElementById("game-info");

        for (let i = 0; i < 8; i++) {
            innerTable.innerHTML += '<div class="row">';

            for (let j = 0; j < 8; j++) {
                innerTable.innerHTML += '<div class="gridsquare">' + (i * 5 + j + 1) + '</div>';
            }

            innerTable.innerHTML += '</div>';
        }
    }
}