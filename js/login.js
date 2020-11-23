// login handling
class login {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.configurationDom = document.getElementById("config");
        this.withdrawDom = document.getElementById("quit");
        this.tableDom = document.getElementById("table");
        this.commandsDom = document.getElementById("game-commands");
        this.loginDom = document.getElementById("login");
        this.userDom = document.getElementById("uname");
        this.signDom = document.getElementById("sign-out");
    }

    start() {
        // Makes account info invisible
        this.signDom.style.display = "none";
        this.userDom.style.display = "none";
        this.configurationDom.style.display = "none";
        this.tableDom.style.display = "none";
        this.withdrawDom.style.display = "none";
        this.commandsDom.style.display = "none";

        // Makes login form Visible
        this.loginDom.style.display = "block";

        // Removes the table
        removeDivs('table');
        pointsWhite = 0;
        pointsBlack = 0;

        // Resets board
        restartGame();
        color = null;
    }

    register() {
        let nick = document.getElementById("username").value;
        let pass = document.getElementById("password").value;
         fetch("http://twserver.alunos.dcc.fc.up.pt:8008/register", {
             method: 'POST',
             body: 	JSON.stringify({"nick": nick, "pass": pass} )
         })
             .then(response => response.json())
             .then(process)
             .catch(console.log);

        function process(response) {
            console.log(response);
        }
    }

    enter() {
        // Get info from form
        this.username = document.getElementById("username").value
        this.password = document.getElementById("password").value

        // Allow login
        if (this.username === "" && this.password === "") {
            this.userDom.innerHTML = this.username;
            this.userDom.style.display = "block";
            this.signDom.style.display = "block";
            this.loginDom.style.display = "none";
            new config().start();
        }
    }
}