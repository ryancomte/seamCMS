var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
mongoose.connect('mongodb://localhost/battle_underground');


app.use(cors());
app.use(bodyParser.json());


var api = require('./api.js');

app.get('/products', api.get);
app.get('/products/:id',api.findById);
app.post('/products', api.post);
app.put('/products/:id',api.update);
app.delete('/products/:id',api.delete);



app.listen(8097);
module.exports = app;