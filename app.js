
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');



const productRoute = require('./routes/product');
// const usersRoute = require('./scr/routes/users');
const usersRoute = require('./controllers/user');
const authRoute = require('./routes/auth');
const contactusRoute = require("./routes/contactus");
const postRoutes = require("./routes/posts");
const chatRoutes = require("./routes/chat");
//_________________________________________
const tutorsRoute = require("./routes/teachers");
const studentRoute = require("./routes/student");




// 1) Start express app
const app = express();

// 2) MIDDLEWARES
app.use([bodyParser.urlencoded({ extended: true}), express.json()]);
app.use(cors());


// 3) ROUTES
app.use('/product', productRoute);
app.use('/user', usersRoute);
app.use('/auth', authRoute);
app.use('/contactus', contactusRoute);
app.use('/posts', postRoutes);
app.use('/chat', chatRoutes);
//__________________________
app.use("/tutors", tutorsRoute);
app.use("/student", studentRoute);

module.exports = app;