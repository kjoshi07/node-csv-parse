/**
 * Created by Khemchandj on 2/4/2016.
 */

/**
 * Created by Khemchandj on 2/3/2016.
 */
var csv = require("fast-csv");
var Employee = require('../models/employee');
module.exports.employee = {
    importEmployeeData: function () {
        csv
            .fromPath(__dirname + '/' + 'data.csv', {headers: true})
            .on("data", function (data) {
                console.log(data);
                //Removes spaces from property value in-case it does have
                for (var key in data) {
                    data[key] = data[key].trim();
                }
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
                //save in database
                employee.save(function (err) {
                    if (err) {
                        console.log("There is an error in processing employee data: " + err);
                    } else {
                        console.log("Employee data has been saved: " + data);
                    }
                })
            })
            .on("error", function (error) {
                console.log("There is an error in processing: " + error);
            })
            .on("end", function () {
                console.log("done");
            });

    }
}
