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
        document.getElementById("table").style.display = "none";
        // Makes login form Visible
        document.getElementById("login").style.display = "block";
        // Removes the table
        this.removeDivs('inner-table');
    }

    enter() {
        // Get info from form
        this.username = document.getElementById("username").value
        this.password = document.getElementById("password").value

        if (this.username === "" && this.password === "") {
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

    // isto deve estar noutro sitio
    genDivs() {
        const table = document.getElementById("table");
        table.style.display = "flex";
        table.innerHTML += '<div id="game-info">';
        table.innerHTML += '<div id="inner-table">';
        const innerTable = document.getElementById("inner-table");
        const gameInfo = document.getElementById("game-info");

        for (let i = 0; i < 8; i++) {
            innerTable.innerHTML += '<div id=row' + i + '>';
            let curRow = document.getElementById("row" + i);

            for (let j = 0; j < 8; j++) {
                curRow.innerHTML += '<div onclick="new actorPlay(this.color).start(id)" id=square' + i + j + '>' + '</div>';
                let curSquare = document.getElementById("square" + i + j);

                if ((i === 3 && j === 4) || (i === 4 && j === 3)) {
                    curSquare.innerHTML += '<div class="whites">';
                } else if ((i === 3 && j === 3) || (i === 4 && j === 4)) {
                    curSquare.innerHTML += '<div class="blacks">';
                }
            }
            innerTable.innerHTML += '</div>';
        }
    }
}

class actorPlay {
    constructor(color) {
        this.color = color;
    }

    start(id) {
        let posX = id.slice(6,7);
        let posY = id.slice(7,8);

        let curSquare = document.getElementById("square" + posX + posY);
        curSquare.innerHTML += '<div class=' + this.color.valueOf() + '>';
    }
}

class minimax {
  //configuracao inicial do tabuleiro
  function initialState(list) {
    var matrix = [];
    for(var i=0; i<9; i++) {
        matrix[i] = [];
        for(var j=0; j<9; j++) {
        }
    }
  }
}
  //estado do jogo
  function getState(list) {

}
