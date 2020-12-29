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

    function getSortOrder(prop) {
        return function(a, b) {
            if (a[prop] < b[prop]) {
                return 1;
            } else if (a[prop] > b[prop]) {
                return -1;
            }
            return 0;
        }
    }

    let response = users.sort(getSortOrder("victories"));
    for (let i = 0; i < response.length; ++i)
        delete response[i].pass;

    let responseRank = {
        ranking: response
    };
    return JSON.stringify(responseRank);
}