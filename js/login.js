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
    nick = document.getElementById("username").value;
    pass = document.getElementById("password").value;
    group = "1";
    fetch("http://twserver.alunos.dcc.fc.up.pt:8008/register", {
      method: 'POST',
      body: 	JSON.stringify({"nick": nick, "pass": pass} )
    })
    .then(function(response){
      return response.text();
    })
    .then(function(response) {
      if(response !== "{}") {
        window.alert("User registered with a different password.")
      }
      else {
        console.log(nick + " " + pass);
        document.getElementById("uname").innerHTML = nick;
        document.getElementById("uname").style.display = "block";
        document.getElementById("sign-out").style.display = "block";
        document.getElementById("login").style.display = "none";
        new config().start();
      }
    })
    .catch(function(error){
    });
  }
}

function join(group, nick, pass) {
  fetch("http://twserver.alunos.dcc.fc.up.pt:8008/join", {
    method: 'POST',
    body: 	JSON.stringify({"group" : group, "nick": nick, "pass": pass} )
  })
  .then(function(response){
    return response.text();
  })
  .then(function(response) {
    if(response === "{}"){
      alert("Waiting for another player.");
    }
    else if (response.includes("error")) {
      alert("Error.");
    }
    else {
      let data = JSON.parse(response);
      color = data.color;
      gameID = data.game;
      update(gameID, nick);
    }
  })
  .catch(function(error){
  });
}

function update() {
  const eventSource = new EventSource('http://twserver.alunos.dcc.fc.up.pt:8008/update' + encodeURI('?nick=' + nick + '&game=' + gameID));
  eventSource.onmessage = function (event) {
    const data = JSON.parse(event.data);
    currentBoard = data.board;
    drawTable2();
    turn = data.turn;
    console.log(data);
  }
}

function leave() {
  eventSource.close();
}

function notify(row, column) {
  fetch("http://twserver.alunos.dcc.fc.up.pt:8008/notify", {
    method: 'POST',
    body: 	JSON.stringify({"nick": nick, "pass": pass, "game": gameID, "move": {"row": row, "column": column}} )
  })
      .then(function(response){
        return response.json();
      })
      .then(function(response) {
        let responseJSON = JSON.parse(response);
        if (responseJSON.error === "Not your turn to play") {
          alert("Not your turn to play");
        }
      })
      .catch(function(error){
      });
}