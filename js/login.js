// login handling
class login {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.group = "1";
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
    let group = "1";
    fetch("http://twserver.alunos.dcc.fc.up.pt:8008/register", {
      method: 'POST',
      body: 	JSON.stringify({"nick": nick, "pass": pass} )
    })
    .then(function(response){
      return response.text();
    })
    .then(function(response) {
      if(response != "{}") {
        window.alert("User registered with a different password.")
      }
      else {
        console.log("yo");
        console.log(nick + " " + pass);
        join(group,nick,pass);
      }
    })
    .catch(function(error){
      return;
    });

  }
}

function join(group,username,password) {
  console.log("hey");
  fetch("http://twserver.alunos.dcc.fc.up.pt:8008/join", {
    method: 'POST',
    body: 	JSON.stringify({"group" : group, "nick": username, "pass": password} )
  })
  .then(function(response){
    return response.text();
  })
  .then(function(response) {
    if(response = "{}"){
      alert("Waiting for another player.");
      this.join(group,username,password);
    }
    else {
      color = response.color;
      this.update(response.game,this.username);
    }
  })
  .catch(function(error){
    return;
  });

  this.userDom.innerHTML = this.username;
  this.userDom.style.display = "block";
  this.signDom.style.display = "block";
  this.loginDom.style.display = "none";
  new config().start();

}
