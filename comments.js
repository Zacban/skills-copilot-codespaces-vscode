// create web server
var express = require('express');
var app = express();
var fs = require('fs');

// create a server
var server = app.listen(3000, function() {
	console.log('Server is running on port 3000');
});

// use the public folder to serve static files
app.use(express.static('public'));

// use the body-parser module
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// read the comments from the file
var comments;
fs.readFile('comments.json', function(err, data) {
	if (err) {
		console.log(err);
	} else {
		comments = JSON.parse(data);
	}
});

// get the comments
app.get('/getComments', function(req, res) {
	res.send(comments);
});

// post a comment
app.post('/postComment', function(req, res) {
	var newComment = req.body;
	comments.push(newComment);
	fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
		if (err) {
			console.log(err);
		} else {
			res.send('success');
		}
	});
});