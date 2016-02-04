var express = require('express');  //load express module to crate instance of app
var mongoose = require('mongoose');

var app = express();
//connect with mongo db.
mongoose.connect('mongodb://localhost:27017/csvdata');
var EmployeeController = require('./app/controllers/EmployeeController');
EmployeeController.employee.importEmployeeData();
app.listen(8000);
console.log('Express server listening on port ' + 8000);

