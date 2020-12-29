const fs = require('fs');
const fileUsers = 'users.txt';
let users = loadUsers();

module.exports.register = function registerLogin(text) {
    try {
        var user = JSON.parse(text);
    } catch (error) {
        console.log(error);
        return "Error while reading";
    }

    if (user.nick === "" || user.pass === "") {
        return "Nick or pass left blank";
    }

    for (let i = 0; i < users.length; i++) {
        const userLoop = users[i];
        if (userLoop.nick === user.nick) {
            // user exist check password
            console.log(userLoop.nick + " compares to " + user.nick);
            if (userLoop.pass === user.pass) {
                console.log(userLoop.pass + " compares to " + user.pass);
                // user exist and right pass, all ok
                return;
            } else if (userLoop.pass !== user.pass){
                // user exist but wrong pass
                return 400;
            }
        }
    }
    // user does not exist, make a new one
    addUser(user.nick, user.pass);
    return;
}

function addUser(nick, pass) {
    users.push( {'nick': nick, 'pass': pass, 'victories':0, 'games':0} );
    saveUsers();
}

function saveUsers() {
    fs.writeFile(fileUsers, JSON.stringify(users), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log(`Users saved to ${fileUsers}.`)
    });
}

function loadUsers() {
    fs.readFile(fileUsers,'utf8',function(err,data) {
        if(err) {
            switch (err.code) {
                case 'ENOENT':
                    console.log(`File ${fileUsers} not found.`);
                    saveUsers();
                    return;

                default:
                    return console.log(err);
            }
        }
        users = JSON.parse(data);
        console.log('data');
        console.log(data);
    });
}

module.exports.ranking = function getRanking() {
    return JSON.stringify({
        "ranking": [
            { "nick": "123", "victories": 350, "games": 623 },
            { "nick": "a", "victories": 269, "games": 550 },
            { "nick": "tati123", "victories": 249, "games": 441 },
            { "nick": "admin", "victories": 220, "games": 318 },
            { "nick": "adeus", "victories": 219, "games": 350 },
            { "nick": "netcan", "victories": 205, "games": 414 },
            { "nick": "ola", "victories": 201, "games": 461 },
            { "nick": "Player 1", "victories": 192, "games": 372 },
            { "nick": "Player 2", "victories": 183, "games": 369 },
            { "nick": "duarte", "victories": 144, "games": 236 }
        ]
    })
}