const http = require('http');
const url  = require('url');
const fs   = require('fs');
let conf = require('./conf.js')
let updater  = require('./updater.js');


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

http.createServer((request,response) => {
    let answer = {};
    const preq = url.parse(request.url,true);
    const pathname = preq.pathname;

    switch(request.method) {
    case 'GET':
        answer = doGet(pathname,request,response);        
        break;

    case 'POST':
        answer = doPost(pathname);

    default:
        answer.status = 400;        
        response.end();    
    }

    if(answer.status === undefined)
        answer.status = 200;
    if(answer.style === undefined)
        answer.style = 'plain';

    response.writeHead(answer.status, headers[answer.style]);
    if(answer.style === 'plain')
        response.end();

}).listen(conf.port);

function doGetRequest(request,response) {
    const pathname = getPathname(request);
    if(pathname === null) {
        response.writeHead(403); // Forbidden
        response.end();
    } else 
        fs.stat(pathname,(err,stats) => {
            if(err) {
                response.writeHead(500); // Internal Server Error
                response.end();
            } else if(stats.isDirectory()) {
                if(pathname.endsWith('/'))
                   doGetPathname(pathname+conf.defaultIndex,response);
                else {
                   response.writeHead(301, // Moved Permanently
                                      {'Location': pathname+'/' });
                   response.end();
                }
            } else 
                doGetPathname(pathname,response);
       });    
}


function getPathname(request) {
    const purl = url.parse(request.url);
    let pathname = path.normalize(conf.documentRoot+purl.pathname);

    if(! pathname.startsWith(conf.documentRoot))
       pathname = null;

    return pathname;
}

function doGetPathname(pathname,response) {
    const mediaType = getMediaType(pathname);
    const encoding = isText(mediaType) ? "utf8" : null;

    fs.readFile(pathname,encoding,(err,data) => {
    if(err) {
        response.writeHead(404); // Not Found
        response.end();
    } else {
        response.writeHead(200, { 'Content-Type': mediaType });
        response.end(data);
    }
  });    
}

function doGet(pathname,
    request,response) {
    let answer = {};

    switch(pathname) {
        case '/update':
            updater.remember(response);
            request.on('close', () =>
            updater.forget(response));
            setImmediate(() =>
            updater.update(
                counter.get())); 
            answer.style = 'sse';
            break;
        default:
            answer.status = 400;
            break;
    }
//change
function doPost(pathname) {
    var answer = {};
   
    switch(pathname) {
     case '/ranking':
      counter.ranking();
      updater.update(counter.get());
      break;
     case '/reset':
      counter.reset();
      updater.update(counter.get());
       break;
     default:
       answer.status = 400;
       break;
     }
   
    return answer;
   }

return answer;
}


function getMediaType(pathname) {
    const pos = pathname.lastIndexOf('.');
    let mediaType;

    if(pos !== -1) 
       mediaType = conf.mediaTypes[pathname.substring(pos+1)];

    if(mediaType === undefined)
       mediaType = 'text/plain';
    return mediaType;
}

function isText(mediaType) {
    if(mediaType.startsWith('image'))
      return false;
    else
      return true;
}
