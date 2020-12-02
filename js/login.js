// login handling
class login {
  constructor() {
    this.configurationDom = document.getElementById("config");
    this.withdrawDom = document.getElementById("quit");
    this.tableDom = document.getElementById("table");
    this.commandsDom = document.getElementById("game-commands");
    this.loginDom = document.getElementById("login");
    this.userDom = document.getElementById("uname");
    this.signDom = document.getElementById("sign-out");
    this.singleDom = document.getElementById("singleplayer");
  }

  start() {
    // resets board
    currentBoard = [
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "light", "dark", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "dark", "light", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"]
    ];

    // Makes account info invisible
    this.signDom.style.display = "none";
    this.userDom.style.display = "none";
    this.configurationDom.style.display = "none";
    this.tableDom.style.display = "none";
    this.withdrawDom.style.display = "none";
    this.commandsDom.style.display = "none";
    this.singleDom.style.display = "none";

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
}