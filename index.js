const http = require('http');
const fs = require('fs');


const serveStaticFile = (res, path, contentType, responseCode) => {

    if (!responseCode) {
        responseCode = 200;
    }

    fs.readFile(__dirname + path, (err, data) => {
       if (err) {
           res.writeHead(500, {contentType: 'text/plan'});
           res.end('500 - INTERNAL ERROR');
       } else {
           res.writeHead(responseCode, {contentType: contentType});
           res.end(data);
       }
    });

};


http.createServer((req, res) => {

    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch (path) {
        case '':
            serveStaticFile(res, '/public/index.html', 'text/html');
            break;
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html');
            break;
        case '/images/logo.png':
            serveStaticFile(res, '/public/images/logo.png', 'image/png');
            break;
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404);
    }

}).listen(3000);

console.info('Server is running on localhost:3000; please press CTR+C to stop server...');