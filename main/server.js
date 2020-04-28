const express = require('express');
const url = require('url');
const http = require('http');
const ejs = require('ejs');

//this is a table that holds page urls. later will be linked to database instead
const pagesTable = ['comic/mockpage_old.png','comic/mockpage.png', 'comic/mockpage_new.png'];

const port = process.argv[2];
const app = express();

//serve static files
app.use(express.static(__dirname + '/views'));

app.set('view engine', 'ejs');

//should I ask about it in a different way?
http.createServer(app).listen(port, function() {
    console.log("Listening on port: "+port);
});

//getting the proper page. if its a number, it's a page.
app.get('/\\/page\\/(\\d)+(\\/*)*/', function(req, res) {
    const path = url.parse(req, true).pathname.split("/");
    console.log("pathname is: "+path);

    let pageNum = parseInt(path[1]);
    if (pageNum >= pagesTable.length) {
        //error
        console.log("Error. Page number too high: " + pageNum);
        pageNum = pagesTable.length -1
    }
    //serve page
    res.render('index', {picture_url: '../../'+pagesTable[pageNum],
             first: pageNum === 0, last: pageNum === pagesTable.length-1,
        prevP: pageNum-1, nextP: pageNum+1, lastP:pagesTable.length-1} );
    console.log("Page url sent.");

    res.send();
});

//serves the first page. when start posting, change to last page
app.get('/', function(req, res) {
   console.log("Serving the first page");
    res.render('index', {picture_url: pagesTable[0], first:true, last:false,
                        prevP: 0, nextP: 1, lastP:pagesTable.length-1});
});

//serves the first page. when start posting, change to last page
app.get('/*', function(req, res) {
    const toPrint = url.parse(req, true).pathname
    console.log(toPrint);
});
