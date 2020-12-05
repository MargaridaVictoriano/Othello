// login handling
class login {
  constructor() {
    this.loginDom = document.getElementById("login");
    this.singleDom = document.getElementById("singleplayer");
  }

  start() {
    // Makes account info invisible
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