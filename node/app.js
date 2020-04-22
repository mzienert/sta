'use strict'
const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.options('*', cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Options");
  next();
});

const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-west-2',
  accessKeyId: 'AKIAIK4JZ5UYVH6I25FQ',
  secretAccessKey: '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',
});

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'sta.ckkpwxahrsi0.us-east-2.rds.amazonaws.com',
  user     : 'root',
  password : 'Sta_2018',
  port     : 3306
});


app.get('/get-content', (req, res) => {

  connection.query('SELECT * FROM sta.siteContent', function (err, result) {
    if(err) throw err;
    res.send(result);
  });

  //connection.end();

});

app.post('/update-content', (req, res) => {

  let decode = decodeURI(req.body.body);
  let id = req.body.id;

  connection.query(`UPDATE sta.siteContent SET body = '${decode}' WHERE id = ${id}`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });


});

module.exports = app
