//Set up mongoose connection
const config = require('./configDB');
const mongoose = require('mongoose');

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString,{ useNewUrlParser: true,  useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


module.exports = mongoose;
