var express = require('express');
	bodyParser = require('body-parser');
	app = express();
_ = require('underscore');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false })) //app.use means it takes this software and installs it into the middleware. middleware runs between the server and the client. it intercepts that request and goes ahead and changes it. 
 
// parse application/json 
app.use(bodyParser.json())

var users = [
	{
			id: 1,
			username: "bob",
			firstname: "Bob",
			lastname: "Jones",
			age: 35
	},
	{
			id: 2,
			username: "joe",
			firstname: "Joseph",
			lastname: "Smith",
			age: 23
	}	
];

//challenge 4
app.get("/users", function(req, res) { //CreateD the route GET /users. It should send back the users array as JSON.
    res.json(users);
});

app.post("/users", function(req, res) {//app.post means we're listening to the post. event listener
	var newUser = req.body; //body of the post request
	users.push(newUser);

	res.json(newUser);
})


//HOMEWORK//

// 1)

app.get('/users/:id', function(req, res) {
var getId = parseInt(req.params.id);
console.log("id");
var foundUser =_.findWhere(users, {id: getId});

res.json(foundUser);
});

// 1) EXTENDED..
app.get('/username/:username', function(req, res) { 
var getName = req.params.username;
console.log("username");
var foundUser=_.findWhere(users, {username: getName});
res.json(foundUser);
});  


app.post ('/users/:id', function(req, res) {
    var newUser = req.body;
    users.id.push(newUser)
    res.json(newUser);
});

app.put('/users/:id', function(req, res){
    var targetID = parseInt(req.params.id);
    var foundUser = _.findWhere(users, {id: targetID})
    foundUser.username = req.body.username;
    foundUser.firstname = req.body.firstname;
    foundUser.lastname = req.body.lastname;
    foundUser.age = parseInt(req.body.age);
    res.json(targetID);
});

app.delete('/users/:id', function(req, res){
    var targetID = parseInt(req.params.id);
    var foundUser = _.findWhere(users, {id: targetID})
    var index = users.indexOf(foundUser);
    users.splice(index, 1);
    res.json(foundUser);


	
app.listen(3000);

/*

DAY CHALLENGE


Create the route PUT /users/:id. It should find the user by id in your users array and update that user.	
Create the route DELETE /users/:id. Again, it should find the user by id in your users array, but this time, it should delete the found user out of the array.
For both update and delete, send a JSON response with the user that was updated or deleted.
Test your routes with Postman.
Push your API to a GitHub repo. Remember to submit the link in the homework submission form.
Stretch Challenges / Bonus

Implement client-side code to interact with your users API. You'll want to read about serving static assets in Express to set up a view, stylesheets, and client-side JavaScript.

Things you'll need:

An Underscore template to render your user data.
A form to create new users, forms to edit each user, and buttons to delete each user.
For updating and deleting, a way to know which user (Hint: remember the data-id HTML attribute).
jQuery event-handlers to register submit events on the forms and click events on the delete buttons.
An AJAX request to GET all users on page load.
AJAX requests to POST, UPDATE, and DELETE users.
Response handlers in your AJAX calls to change the state of the DOM when data comes back from the server.

*/