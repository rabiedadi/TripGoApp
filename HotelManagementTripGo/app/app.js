const cors = require('./middlewares/cors');
const errors = require('./middlewares/errors');
const accessLogStream = require('./middlewares/accessLogStream');

const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const options = require('./routes/options');
const platformLanguage = require('./routes/platformLanguage');
const hotel = require('./routes/hotel');
const room = require('./routes/room');

const bodyParser = require('body-parser');
const mongoose = require('../config/db');
const config = require('./routes/config');




const app = express();

// for security
app.use(helmet());
app.disable('x-powered-by');

// jwt secret token
app.set('secretKey', process.env.JWT_KEY);

// cors middleware
app.use(cors.corsHeaders);

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


// create an access log file
app.use(logger('combined', { stream: accessLogStream }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// for public resources
app.use('/',express.static('app/public'));

// public route
app.use('/hotel/options', options);
app.use('/hotel/platformLanguage', platformLanguage);
app.use('/hotel/room', room);
app.use('/hotel', hotel);
app.use('/config', config);

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
app.use(errors.notFound);
// handle other errors
app.use(errors.handleOthers);


module.exports  = app;

