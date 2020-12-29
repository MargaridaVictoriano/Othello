function register() {
    nick = document.getElementById("username").value;
    pass = document.getElementById("password").value;
    group = "1";

    let registerInfo = {
        nick: nick,
        pass: pass
    }

    fetch(url + "register", {
        method: 'POST',
        body: JSON.stringify(registerInfo)
    })
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            if (data !== "{}") {
                console.log(data);
                message("User registered with a different password.");
                new login().start();
            } else {
                // Removes fail to login message
                removeDivs("message");
                // Joins
                join();
            }
        })
        .catch(function (error) {
            return;
        });
}

function join() {
    let userInfo = {
        group: group,
        nick: nick,
        pass: pass
    }

    fetch(url + "join", {
        method: 'POST',
        body: JSON.stringify(userInfo)
    })
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            let obj = JSON.parse(data);
            gameID = obj.game;
            color = obj.color;

            if (color === "dark") {
                player = "dark";
                opponent = "light";
            }
            else if (color === "light"){
                opponent = "dark";
                player = "light";
            }

            new config().onlineStart();
            update();
        })
        .catch(function (error) {
            return;
        });

    new animations().loading();
}

function update() {
    const eventSource = new EventSource(url + 'update' + encodeURI('?nick=' + nick + '&game=' + gameID));
    eventSource.onmessage = function (event) {
        let obj = JSON.parse(event.data);
        currentBoard = obj.board;
        turn = obj.turn;

        // check winner then event close
        if (obj.winner !== undefined) {
            if (nick === obj.winner) {
                increment(player);
                message("You are the winner!");
            }
            else {
                increment(opponent);
                message("You lost...");
            }

            eventSource.close();
            new config().start();
            return;
        }

        // skips play
        if (obj.skip !== undefined) {
            message("You have no moves, opponent's turn.");
            notify(null);
        }

        // removes any pop up when game is found
        new animations().forceClose("message");
        removeDivs("message");
        // draws table and presents game commands
        drawTable2();
        document.getElementById("game-commands").style.display = "flex";
    }
}

function notify(row, column) {
    let move = {
        row: row,
        column: column
    }
    let notification = {
        nick: nick,
        pass: pass,
        game: gameID,
        move: move
    }

    fetch(url + "notify", {
        method: 'POST',
        body: JSON.stringify(notification)
    })
    .then(function (response) {
        return response.json();
    })
    .catch(function(error) {
        return;
    });
}

function leave() {
    let gameInfo = {
        nick: nick,
        pass: pass,
        game: gameID
    }

    fetch(url + "leave", {
        method: 'POST',
        body: JSON.stringify(gameInfo)
    })
        .then(function (response) {
            return response.json();
        })
        .catch(function(error) {
            return;
        });

    pointsWhite = 0;
    pointsBlack = 0;
    // removes any pop up
    new animations().forceClose("message");
    removeDivs("message");

    new config().start();
}

function ranking() {
    fetch(url + "ranking", {
        method: 'POST',
        body: '{}'
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let rankList = data.ranking;
        topRank(rankList);
    })
    .catch(function(error) {
        return;
    });
}