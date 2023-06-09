
const express = require('express');
const dotEnv  = require("dotenv");
dotEnv.config();
const productRoute = require('./scr/routes/product');
const usersRoute = require('./scr/routes/users');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const cors = require('cors');



mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.on('connected', ()=>{ console.log(" connected with clouddd")});
connection.on('erorr', ()=>{ console.log(" error with DB")});

app.use([bodyParser.urlencoded({ extended: true}), express.json()])
app.use(cors());

app.use('/product', productRoute);
app.use('/users', usersRoute);


//////////////////////////////////////////////////////////////////////

module.exports = app;