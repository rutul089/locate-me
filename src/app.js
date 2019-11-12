//mongodb+srv://rutul:Navkar123@locateme-2utag.mongodb.net/locate-me?retryWrites=true&w=majority
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");


//-- Route name 
const userRoute = require('./api/routes/user')
const productRoute = require('./api/routes/products')

//-- DB connection 

// mongoose.connect('mongodb+srv://rutul:' +  process.env.MONGO_PWD
//  +'@locateme-2utag.mongodb.net/' + process.env.MONGO_DEFAULT_DB  + '?retryWrites=true&w=majority')

mongoose.connect('mongodb+srv://Test:Test123456@cluster0-b0egl.mongodb.net/AngularAssignment?retryWrites=true&w=majority',
                (err) => {
          if (err) console.log('Failed to connect to mongodb server', err);
          else console.log('successfully connected to mongodb server!');
});


app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//-- CROSS Resource Sharing Header
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

//-- Routing paath
app.use('/user',userRoute);
app.use('/product',productRoute);

app.use(helmet());
app.use(compression());

//-- Error handle

app.use((req, res, next) => {
    const error = new Error("Something went wrong!");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error_code: 11,
      message: error.message,
      isSuccess: false
    });
  });
module.exports = app;
