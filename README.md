#How to parse and save a csv file in mongodb in node.js

#1. Install all dependenices.
     "dependencies": {
         "express": "^4.13.4",
         "fast-csv": "^1.0.0",
         "mongoose": "^4.4.1"
      }
      
#2. Start node server(app.js)
       var express = require('express');  //load express module to crate instance of app
       var mongoose = require('mongoose');

       var app = express();
       //connect with mongo db.
       mongoose.connect('mongodb://localhost:27017/csvdata');
       app.listen(8000);
       console.log('Express server listening on port ' + 8000);
       
#3. Create your model(./app/modelss/employee.js)
       /**
        * Created by Khemchandj on 2/4/2016.
       */
       var mongoose = require('mongoose');
       var EmployeeSchema = new mongoose.Schema({
           employeeCode: {type: String, required: true},
           firstName: String,
           lastName: String,
           email: {type: String, required: true},
           jobTitle: String,
           department: String,
           location: String,
           annualSalary: String,
           monthlySalary: String,
           dateHired: {type: Date, Default: Date.now()}

         });

        module.exports = mongoose.model('Employee', EmployeeSchema);
        
#4. Here is my csv file in with header information (./app/controllers/data.csv)
       Employee Code,First Name,Last Name,email,Job Title,Department,Location,Annual Salary,Monthly Salary,Date Hired
       E0001,Anthony ,Taylor,test1@test.com,Engineer,Engineering,Los Angeles," 55,500 "," 4,625 ",2/11/00
       E0002,Charles,Billings,test1@test.com,Manager,Marketing,Los Angeles," 39,000 "," 3,250 ",8/13/02
       E0003,Chris,Pounds,test1@test.com,Engineer,Engineering,Seattle," 29,850 "," 2,488 ",3/24/99
       
#5. Process csv data(./app/controllers/EmployeeController.js)

I am using fast-csv module to parse csv file which will give me each row in "data" event, I am also reading csv file with options "headers: true" which will give data with headers and values as key and value.

i)First load all modules:
       var csv = require("fast-csv");
       var Employee = require('../models/employee');
ii) Read file:
        csv
            .fromPath(__dirname + '/' + 'data.csv', {headers: true})

iii) in data event it will return me each row as data.
         .on("data", function (data) {
iv) First I am triming spaces if there is any in any value
          //Removes spaces from property value in-case it does have
                for (var key in data) {
                    data[key] = data[key].trim();
                }
                
v) Create a employee object..

         //Create a employee Object and assign all values for it to save in database
                var employee = new Employee({
                    employeeCode: data['Employee Code'],
                    firstName: data['First Name'],
                    lastName: data['Last Name'],
                    email: data['email'],
                    jobTitle: data['Job Title'],
                    department: data['Department'],
                    location: data['Location'],
                    annualSalary: data['Annual Salary'],
                    monthlySalary: ['Monthly Salary'],
                    dateHired: data['Date Hired']
                });
                
  vi) save in database, if thee is any error then print otheriwse print saved mesage.
          employee.save(function (err) {
                    if (err) {
                        console.log("There is an error in processing employee data: " + err);
                    } else {
                        console.log("Employee data has been saved: " + data);
                    }
                    
 vii) If there is any error in parsing csv file then will catch under error event otheriwse will go in end event and finish parsing.
 
           .on("error", function (error) {
                console.log("There is an error in processing: " + error);
            })
            .on("end", function () {
                console.log("done");
            });
            
#6. finally call the function in app.js and run node app with "node app.js"
        var EmployeeController = require('./app/controllers/EmployeeController');
        EmployeeController.employee.importEmployeeData();

