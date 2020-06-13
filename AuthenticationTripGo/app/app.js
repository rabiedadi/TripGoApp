const cors = require('./middlewares/cors');
const errors = require('./middlewares/errors');
const accessLogStream = require('./middlewares/accessLogStream');

const express = require('express');
const logger = require('morgan');
const RateLimit = require('express-rate-limit');

const user = require('./routes/user');
const auth = require('./routes/auth');

const bodyParser = require('body-parser');
const mongoose = require('../config/db');
const config = require('./routes/config');


const app = express();


// cors middleware
app.use(cors.corsHeaders);

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// create an access log file
app.use(logger('combined', { stream: accessLogStream }));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const limiter = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});

//  apply to all requests
if (process.env.NODE_ENV === "prod") app.use(limiter);

// for public resources
app.use('/',express.static('app/public'));

// public route
app.use('/auth', auth);
app.use('/user', user);
app.use('/config', config);

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
app.use(errors.notFound);
// handle other errors
app.use(errors.handleOthers);


module.exports  = app;

