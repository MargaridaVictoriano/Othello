function register() {
    nick = document.getElementById("username").value;
    pass = document.getElementById("password").value;
    group = 1;

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
                window.alert("User registered with a different password.")
            }
        })
        .catch(function (error) {
        });

    join();
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

            update();
            new config().start();
        })
        .catch(function (error) {
        });
}

function update() {
    const eventSource = new EventSource(url + 'update' + encodeURI('?nick=' + nick + '&game=' + gameID));
    eventSource.onmessage = function (event) {
        let obj = JSON.parse(event.data);
        currentBoard = obj.board;
        drawTable2();
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
    });
}

function leave() {
    EventSource.CLOSED;
    new login().start()
}

function ranking() {
    fetch(url + "ranking", {
        method: 'POST',
        body: '{}'
    })
    .then(function (response) {
        return response.json();
    })
    .catch(function(error) {
    });
}