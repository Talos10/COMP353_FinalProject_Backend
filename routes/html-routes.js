const express = require('express');
require("dotenv").config();

const mysql = require('mysql');

const PORT = process.env.PORT || 3000;

const app = express();

const connection = mysql.createConnection({

    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});

connection.connect(function(err){

    (err)? console.log(err): console.log(connection);

});

require('./routes/html-routes')(app);

app.listen(PORT, () =>{

    console.log(`App running on port ${PORT}`);

});
