'user strict';
global.secreteKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTUyMjU2NTksImp3dGlkIjoiOXlvejZmIiwiYXVkaWVuY2UiOiJURVNUIiwiZGF0YSI6e30sImV4cCI6MTU1NTIyOTI1OX0.5JDkEAyLEKnghMJ1lsTAy5OAa3hOxg4SkuMoiKXkwSI"
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbusermgnt'
})

connection.connect((err) => {
    if (!err)
        console.log("DB connection succeded.")
    else
        console.log("DB connection Failed \n Error:", err)
})

module.exports = connection;
