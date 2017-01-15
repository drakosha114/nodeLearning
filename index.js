const http = require('http');
const fs = require('fs');
const express = require('express');
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});
const fortune = require('./libs/fortune.js');

/*
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
*/

const serveStaticFile = (res, path, type, status) => {
    res.status(status || 200);
    res.type(type);

    fs.readFile(__dirname + path, (err, data) => {
       if (err) {
           res.status(500);
           res.type('text/plan');
           res.send('500 - Server error');
       } else {
           res.status(status || 200);
           res.type(type);
           res.send(data);
       }
    });
};


var app = express();

app.set('port', process.env.PORT || 3000);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    //serveStaticFile(res, '/public/index.html', 'text/html', 200);
    res.render('home');
});

app.get('/about', (req, res) => {
    //serveStaticFile(res, '/public/about.html', 'text/html', 200);
    res.render('about', {fortune: fortune.getFortune()});
});

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    //serveStaticFile(res, '/public/404.html', 'text/html', 404);
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next) => {
   //res.type('text/plan');
   //res.status(500);
   //res.send('500 - Server error');
   console.error(err.stack);
   res.status(500);
   res.render('500');

});


app.listen(app.get('port'), () => {
   console.log('Сервер запущен на http://localhost:' + app.get('port') + '. Для завершения работы сервера нажмите CTR+C');
});
