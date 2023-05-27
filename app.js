// const http = require('http');

// let port1 = http.createServer(function (req , res) {
//     console.log(" Mariam Server");
//     res.write("From back To Mariam");
//     res.end()
// })

// port1.listen(3000, function () {
//     console.log(" Mariam Server listening on");
// })

const express = require('express');
const productRoute = require('./scr/route/product');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const cors = require('cors');

//// const port = 3000;

mongoose.connect('mongodb+srv://mariam2waleed:mariam2waleed@cluster0.ecmg4ah.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.on('connected', ()=>{ console.log(" connected with clouddd")});
connection.on('erorr', ()=>{ console.log(" error with DB")});

app.use([bodyParser.urlencoded({ extended: true}), express.json()])
app.use(cors());

var port = process.env.PORT || 8080
app.use('/product', productRoute);


app.listen(port, () => {
    console.log("Mariam Server is working");
})

module.exports = app;
