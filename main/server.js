const express = require('express');
const url = require('url');
const http = require('http');

//this is a table that holds page urls. later will be linked to database instead
const pagesTable = ['resources/comic/mockpage_old.png','resources/comic/mockpage.png', 'resources/comic/mockpage_new.png'];

const port = process.argv[2];
const app = express();
http.createServer(app).listen(port);

app.get('/(page-)?', function(req, res) {

});


