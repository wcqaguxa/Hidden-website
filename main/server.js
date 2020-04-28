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

    const pageNum = parseInt(path[1]);
    if (pageNum >= pagesTable.length) {
        //error
        console.log("Error. Page number too high: "+pageNum);
    } else {
        //serve page
        res.render('index', {picture_url: '../../'+pagesTable[pageNum]} );
        console.log("Page url sent.");
    }
    res.send();
});

//anything, including the web page
app.get('/', function(req, res) {
   console.log("Serving the first page");
    res.render('index', {picture_url: pagesTable[0]});
});
