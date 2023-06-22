const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
const app = require('./app.js');


//const initializeSocket = require('./sockets/socket');



mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  //   useCreateIndex: true,
  });
  const connection = mongoose.connection;
  connection.on('connected', ()=>{ console.log("DB connected")});
  connection.on('error', (err) => { console.log(`Error connecting to MongoDB: ${err}`);
  });

const port = process.env.PORT || 3000;
const server =app.listen(port, ()=> {
    console.log(`App running on port ${port}...`);
});

//initializeSocket(server); // Initialize socket.io

