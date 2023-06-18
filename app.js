
const express = require('express');
const dotEnv  = require("dotenv");
dotEnv.config();
const productRoute = require('./scr/routes/product');
// const usersRoute = require('./scr/routes/users');
const usersRoute = require('./scr/logic/user');
const authRoute = require('./scr/auth/auth');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true,
});
const connection = mongoose.connection;
connection.on('connected', ()=>{ console.log(" connected with clouddd")});
connection.on('error', (err) => { console.log(`Error connecting to MongoDB: ${err}`);
});

// Set useCreateIndex option to true
// mongoose.set('useCreateIndexs', true);

app.use([bodyParser.urlencoded({ extended: true}), express.json()]);
app.use(cors());

app.use('/product', productRoute);
// app.use('/users', usersRoute);
app.use('/user', usersRoute);
app.use('/auth', authRoute);
////////////////////////////////
// app.use('/contactus', contactusRoute);
module.exports = app;