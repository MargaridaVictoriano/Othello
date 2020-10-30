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
        this.removeDivs('table');
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
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}

class config {
    constructor() {
        this.v = document.getElementById("versus").value;
        this.c = document.getElementById("color").value;
        this.d = document.getElementById("difficulty").value;
    }

    start() {
        document.getElementById("config").style.display = "block";
    }

    beginNewGame() {
        document.getElementById("config").style.display = "none";
        this.genDivs(this.c);
    }

    genDivs(color) {
        let table = document.getElementById("table");
        table.style.display = "flex";

        for (let i = 0; i < 8; i++) {
            let row = document.createElement("div");
            table.appendChild(row);
            row.setAttribute("id", "row" + i);
            let curRow = document.getElementById("row" + i);

            for (let j = 0; j < 8; j++) {

                let piece = document.createElement("div");

                piece.onclick = function() {
                    new actorPlay(i, j, color).action();
                };
                piece.setAttribute("id", "square" + i + j);
                curRow.appendChild(piece);

                let curSquare = document.getElementById("square" + i + j);

                if ((i === 3 && j === 4) || (i === 4 && j === 3)) {
                    let whiteSquare = document.createElement("div");
                    curSquare.appendChild(whiteSquare);
                    whiteSquare.className = "whites";
                } else if ((i === 3 && j === 3) || (i === 4 && j === 4)) {
                    let blackSquare = document.createElement("div");
                    curSquare.appendChild(blackSquare);
                    blackSquare.className = "blacks";
                }
            }
        }
    }
}

class actorPlay {
    constructor(posX, posY, color) {
        this.posX = posX;
        this.posY = posY;
        this.color = color;
    }

    action() {
        let curSquare = document.getElementById("square" + this.posX + this.posY);
        let piece = document.createElement("div");
        curSquare.appendChild(piece);
        piece.className = this.color;
    }
}
