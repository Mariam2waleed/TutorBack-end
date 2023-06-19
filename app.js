
const express = require('express');
const dotEnv  = require("dotenv");
dotEnv.config();
// const productRoute = require('./scr/routes/product');
// const usersRoute = require('./scr/routes/users');
const usersRoute = require('./scr/logic/user');
// const authRoute = require('./scr/auth/auth');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactusRoute = require("./scr/routes/contactus");
const postRoutes = require("./scr/routes/posts");
const chatRoutes = require("./scr/routes/chat");


//  start ahmed project
const parser = require("body-parser");
const authRouter = require("./routes/auth");
const tutorsRouter = require("./routes/teachers");
const studentRouter = require("./routes/student");
app.use(parser.json({limit: "50mb"}));
app.use("/images", express.static("images"));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//       "Access-Control-Allow-Methods",
//       "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use("/auth", authRouter);
app.use("/tutors", tutorsRouter);
app.use("/student", studentRouter);
app.use((error, req, res, next) => {
  console.log(error);
  const message = error.message;
  const status = error.statusCode || 500;
  res.status(status).json({
    Message: message,
  });
});

//  end  ahmed project

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

// app.use('/product', productRoute);
app.use('/user', usersRoute);
app.use('/auth', authRoute);
app.use('/contactus', contactusRoute);
app.use('/posts', postRoutes);
app.use('/chat', chatRoutes);
////////////////////////////////
module.exports = app;