const http = require('http');
const url = require('url');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

// {nick(string), pass(string), victories(int), games(int)}
var users = [];

const fileUsers = 'users.txt';

loadUsers();
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
};

function saveUsers() {
    fs.writeFile(fileUsers, JSON.stringify(users), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log(`Users saved to ${fileUsers}.`)
    });
}

const server = http.createServer();
server.on('request', (req, res) => {
    const parsedUrl = url.parse(req.url,true);
    const pathname = parsedUrl.pathname;
    //const query = parsedUrl.query;

    console.log('Pathname is ' + pathname);
    console.log('Request type is ' + req.method);

    switch (req.method) {
        /*----------- P O S T ----------*/
        case 'POST':
            switch (pathname) {
                case '/ranking':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.end(getRanking());
                    break;

                case '/register':
                    req.on('data',
                        (chunk) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'text/plain');
                            res.setHeader('Access-Control-Allow-Origin', '*');

                            var text = (chunk.toString('utf8'));
                            var userStatus = registerLogin(text);
                            var body = {};
                            if (userStatus != null) {
                                body.error = userStatus;
                                res.statusCode = 400;
                            }
                            res.end(JSON.stringify(body));
                    });

                    break;

                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Somethings wrong.');
                    break;
            }
            break;

        /*----------- G E T ----------*/
        case 'GET':
             switch (pathname) {
                  case '/ranks':
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      res.end(getRanking());
                      break;
                 default:
                     res.statusCode = 404;
                     res.setHeader('Content-Type', 'text/plain');
                     res.end('Somethings wrong.');
                     break;
             }
             break;

        default:
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Somethings wrong.');
            break;
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http: //${hostname}:${port}/`);
});

function getRanking() {
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

//return error | null if success
function registerLogin(text) {
    try {
        var user = JSON.parse(text);
    } catch (error) {
        console.log(error);
        return "Error while reading";
    }

    if (user == null || user.nick == "" || user.pass == "") {
        return "Nick or pass left blank";
    }
    for (let i = 0; i < users.length; i++) {
        const userLoop = users[i];
        if (userLoop.nick == user.nick) {
            // user exist check password
            if (userLoop.pass == user.pass) {
                // user exist and right pass, all ok
                return;
            } else {
                // user exist but wrong pass
                return "User registered with a different password";
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