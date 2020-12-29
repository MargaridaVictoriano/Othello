// modules and port
const hostname = '127.0.0.1';
const port = 3000;
let http = require('http');
let url = require('url');
let updater = require('./modules/updater.js');
let users = require('./modules/users.js');
let board = require('./modules/board.js');

const headers = {
    plain: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
    },
    sse: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Connection': 'keep-alive'
    }
};

const server = http.createServer();
server.on('request', (request, response) => {
    const preq = url.parse(request.url,true);
    const pathname = preq.pathname;
    let answer = {};

    switch(request.method) {
        case 'GET':
            doGet(pathname,request,response);
            break;
        case 'POST':
            doPost(pathname,request,response);
            break;
        default:
            answer.status = 500;
            response.writeHead(answer.status, headers[answer.style]);
            response.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http: //${hostname}:${port}/`);
});

function doGet(pathname, request, response) {
    let answer = {};
    switch(pathname) {
        case '/update':
            updater.remember(response);
            setImmediate(() => updater.update(board.getBoard()));
            answer.style = 'sse';
            break;
        default:
            answer.status = 400;
            break;
    }
    return answer;
}

function doPost(pathname, request, response) {
    let answer = {};
    switch(pathname) {
        case '/leave':
            response.end(updater.forget(response));
            break;
        case '/reset':
            response.end(users.ranking());
            break;
        case '/register':
            request.on('data',
                (chunk) => {
                    var text = (chunk.toString('utf8'));
                    console.log(text);
                    var userStatus = users.register(text);
                    if (userStatus !== undefined) {
                        answer.status = 400;
                        answer.style = 'plain';
                        response.writeHead(answer.status, headers[answer.style]);
                        response.end();
                    } else {
                        answer.status = 200;
                        answer.style = 'plain';
                        response.writeHead(answer.status, headers[answer.style]);
                        response.end("{}");
                    }
                });
            break;
        case '/ranking':
            answer.status = 200;
            answer.style = 'plain';
            response.writeHead(answer.status, headers[answer.style]);
            response.end(users.ranking());
            break;
        default:
            answer.status = 400;
            break;
    }
    return answer;
}