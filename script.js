class login {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    start() {
        document.getElementById("login").style.display="block";
        document.getElementById("sign-out").style.display="none";
        document.getElementById("uname").style.display="none";
    }

    enter() {
        this.username = document.getElementById("username").value
        this.password = document.getElementById("password").value

        if ( this.username == "admin" && this.password == "password") {
            document.getElementById("uname").innerHTML=this.username;
            document.getElementById("uname").style.display="block";
            document.getElementById("sign-out").style.display="block";
            document.getElementById("login").style.display = "none";
            new config().start();
        }
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
        alert(this.versus + this.color + this.difficulty);
    }
}

class main {
    /**/
}